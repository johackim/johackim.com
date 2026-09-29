import Head from 'next/head';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useRef } from 'react';
import { generateNextSeo } from 'next-seo/pages';
import Layout from '../components/layout';
import { getGraph } from '../lib/wikilinks';

const SETTINGS = {
    repelStrength: 100,
    linkStrength: 0.08,
    linkDistance: 40,
    centerStrength: 0.06,
    friction: 0.6,
    cooling: 0.015,
    reheat: 0.3,
    minAlpha: 0.005,
    minZoom: 0.1,
    maxZoom: 6,
    maxFitZoom: 1.5,
    fitPadding: 40,
    cameraSpeed: 0.1,
    labelZoom: 0.6,
    dimOpacity: 0.15,
    fadeSpeed: 0.2,
    fontSize: 12,
    clickTolerance: 4,
};

const COLORS = {
    node: '#6b7280',
    unresolved: '#d1d5db',
    line: '#d1d5db',
    text: '#374151',
    accent: '#0e7490',
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const lerp = (from, to, amount) => from + (to - from) * amount;

const sum = (vectors) => vectors.reduce((total, vector) => ({ x: total.x + vector.x, y: total.y + vector.y }), { x: 0, y: 0 });

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

const spiralPosition = (index) => {
    const radius = 10 * Math.sqrt(0.5 + index);
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
};

const neighborsOf = (id, links) => new Set(links
    .filter(({ source, target }) => source === id || target === id)
    .map(({ source, target }) => (source === id ? target : source)));

const repulsion = (node, nodes) => {
    let x = 0;
    let y = 0;

    for (const other of nodes) {
        const dx = other.x - node.x;
        const dy = other.y - node.y;
        const push = -SETTINGS.repelStrength / Math.max(dx * dx + dy * dy, 100);
        x += dx * push;
        y += dy * push;
    }

    return { x, y };
};

const attraction = (node, neighbors) => sum(neighbors.map((other) => {
    const dx = other.x - node.x;
    const dy = other.y - node.y;
    const length = Math.hypot(dx, dy) || 1;
    const pull = ((length - SETTINGS.linkDistance) / length) * SETTINGS.linkStrength;
    return { x: dx * pull, y: dy * pull };
}));

const gravity = (node) => ({ x: -node.x * SETTINGS.centerStrength, y: -node.y * SETTINGS.centerStrength });

const toWorld = (point, camera, size) => ({
    x: camera.x + (point.x - size.width / 2) / camera.zoom,
    y: camera.y + (point.y - size.height / 2) / camera.zoom,
});

const zoomAround = (camera, point, factor, size) => {
    const zoom = clamp(camera.zoom * factor, SETTINGS.minZoom, SETTINGS.maxZoom);
    const anchor = toWorld(point, camera, size);

    return {
        zoom,
        x: anchor.x - (point.x - size.width / 2) / zoom,
        y: anchor.y - (point.y - size.height / 2) / zoom,
    };
};

const pan = (camera, delta) => ({ ...camera, x: camera.x - delta.x / camera.zoom, y: camera.y - delta.y / camera.zoom });

const fitCamera = (nodes, size) => {
    const xs = nodes.map(({ x }) => x);
    const ys = nodes.map(({ y }) => y);
    const left = Math.min(...xs) - SETTINGS.fitPadding;
    const right = Math.max(...xs) + SETTINGS.fitPadding;
    const top = Math.min(...ys) - SETTINGS.fitPadding;
    const bottom = Math.max(...ys) + SETTINGS.fitPadding;

    return {
        x: (left + right) / 2,
        y: (top + bottom) / 2,
        zoom: clamp(Math.min(size.width / (right - left), size.height / (bottom - top)), SETTINGS.minZoom, SETTINGS.maxFitZoom),
    };
};

const moveCamera = (camera, target, amount) => ({
    x: lerp(camera.x, target.x, amount),
    y: lerp(camera.y, target.y, amount),
    zoom: lerp(camera.zoom, target.zoom, amount),
});

const nodeAt = (nodes, point) => nodes.findLast((node) => distance(node, point) <= node.radius + 2);

const emphasis = (isRelated, fade) => (isRelated ? 1 : 1 - fade * (1 - SETTINGS.dimOpacity));

const labelVisibility = (zoom) => clamp((zoom - SETTINGS.labelZoom) / 0.4, 0, 1);

const isRelatedNode = (id, focus, neighbors) => !focus || id === focus || neighbors.get(focus).has(id);

const isRelatedLink = ({ source, target }, focus) => !focus || source === focus || target === focus;

const nodeColor = (node, activeId) => {
    if (node.id === activeId) return COLORS.accent;
    if (node.isUnresolved) return COLORS.unresolved;
    return COLORS.node;
};

const cursorFor = ({ pointer, hovered }) => {
    if (pointer) return 'grabbing';
    if (hovered) return 'pointer';
    return 'grab';
};

const createState = ({ nodes, links, activeId }, size, fontFamily) => {
    const neighbors = new Map(nodes.map(({ id }) => [id, neighborsOf(id, links)]));

    const placedNodes = nodes.map((node, index) => ({
        ...node,
        ...spiralPosition(index),
        vx: 0,
        vy: 0,
        radius: 3 + Math.sqrt(neighbors.get(node.id).size) * 2,
    }));

    return {
        nodes: placedNodes,
        links,
        neighbors,
        activeId,
        size,
        fontFamily,
        alpha: 1,
        camera: fitCamera(placedNodes, size),
        isCameraFollowing: true,
        pointer: null,
        hovered: null,
        focus: null,
        fade: 0,
    };
};

const pinnedNode = ({ pointer, camera, size }) => (pointer?.nodeId ? { id: pointer.nodeId, ...toWorld(pointer.screen, camera, size) } : null);

const simulate = (state) => {
    const { nodes, neighbors, alpha } = state;
    const pinned = pinnedNode(state);
    const nodesById = new Map(nodes.map((node) => [node.id, node]));

    return nodes.map((node) => {
        if (node.id === pinned?.id) return { ...node, ...pinned, vx: 0, vy: 0 };

        const linkedNodes = [...neighbors.get(node.id)].map((id) => nodesById.get(id));
        const force = sum([repulsion(node, nodes), attraction(node, linkedNodes), gravity(node)]);
        const vx = (node.vx + force.x * alpha) * SETTINGS.friction;
        const vy = (node.vy + force.y * alpha) * SETTINGS.friction;

        return { ...node, x: node.x + vx, y: node.y + vy, vx, vy };
    });
};

const stepPhysics = (state) => (state.alpha > SETTINGS.minAlpha ? {
    nodes: simulate(state),
    alpha: state.alpha * (1 - SETTINGS.cooling),
} : {});

const stepCamera = ({ isCameraFollowing, camera, nodes, size }) => (isCameraFollowing ? {
    camera: moveCamera(camera, fitCamera(nodes, size), SETTINGS.cameraSpeed),
} : {});

const stepFade = ({ hovered, focus, fade }) => {
    const nextFade = lerp(fade, hovered ? 1 : 0, SETTINGS.fadeSpeed);
    return { fade: nextFade, focus: hovered ?? (nextFade > 0.01 ? focus : null) };
};

const advance = (state) => ({ ...state, ...stepPhysics(state), ...stepCamera(state), ...stepFade(state) });

const hoveredId = (state, screen) => nodeAt(state.nodes, toWorld(screen, state.camera, state.size))?.id ?? null;

const pointerDown = (state, screen) => {
    const nodeId = hoveredId(state, screen);
    return { ...state, pointer: { nodeId, start: screen, screen }, hovered: nodeId, isCameraFollowing: false };
};

const pointerMove = (state, screen) => {
    const { pointer } = state;
    if (!pointer) return { ...state, hovered: hoveredId(state, screen) };

    const moved = { ...state, pointer: { ...pointer, screen } };
    if (pointer.nodeId) return { ...moved, alpha: Math.max(state.alpha, SETTINGS.reheat) };
    return { ...moved, camera: pan(state.camera, { x: screen.x - pointer.screen.x, y: screen.y - pointer.screen.y }) };
};

const pointerUp = (state, screen) => ({ ...state, pointer: null, hovered: hoveredId(state, screen) });

const pointerLeave = (state) => ({ ...state, hovered: null });

const wheel = (state, screen, deltaY) => ({
    ...state,
    camera: zoomAround(state.camera, screen, Math.exp(-deltaY * 0.002), state.size),
    isCameraFollowing: false,
});

const clickedNode = ({ pointer, nodes }, screen) => (pointer?.nodeId && distance(pointer.start, screen) < SETTINGS.clickTolerance
    ? nodes.find(({ id }) => id === pointer.nodeId)
    : null);

const drawLine = (context, from, to) => {
    context.beginPath();
    context.moveTo(from.x, from.y);
    context.lineTo(to.x, to.y);
    context.stroke();
};

const drawCircle = (context, node) => {
    context.beginPath();
    context.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    context.fill();
};

const paint = (context, drawShape, layers) => layers
    .filter(({ opacity }) => opacity > 0.01)
    .forEach(({ color, opacity }) => {
        context.globalAlpha = opacity;
        context.fillStyle = color;
        context.strokeStyle = color;
        drawShape();
    });

const drawLinks = (context, { nodes, links, focus, fade }) => {
    const nodesById = new Map(nodes.map((node) => [node.id, node]));

    links.forEach((link) => {
        const isRelated = isRelatedLink(link, focus);

        paint(context, () => drawLine(context, nodesById.get(link.source), nodesById.get(link.target)), [
            { color: COLORS.line, opacity: emphasis(isRelated, fade) },
            { color: COLORS.accent, opacity: focus && isRelated ? fade : 0 },
        ]);
    });
};

const drawNodes = (context, { nodes, neighbors, activeId, focus, fade }) => nodes.forEach((node) => paint(context, () => drawCircle(context, node), [
    { color: nodeColor(node, activeId), opacity: emphasis(isRelatedNode(node.id, focus, neighbors), fade) },
    { color: COLORS.accent, opacity: node.id === focus ? fade : 0 },
]));

const drawLabels = (context, { nodes, neighbors, focus, fade, camera }) => nodes.forEach((node) => {
    const isRelated = isRelatedNode(node.id, focus, neighbors);
    const opacity = focus && isRelated
        ? Math.max(labelVisibility(camera.zoom), fade)
        : labelVisibility(camera.zoom) * emphasis(isRelated, fade);

    paint(context, () => context.fillText(node.title, node.x, node.y + node.radius + 4), [{ color: COLORS.text, opacity }]);
});

const draw = (context, state) => {
    const { camera, size, fontFamily } = state;

    context.setTransform(size.ratio, 0, 0, size.ratio, 0, 0);
    context.clearRect(0, 0, size.width, size.height);
    context.translate(size.width / 2, size.height / 2);
    context.scale(camera.zoom, camera.zoom);
    context.translate(-camera.x, -camera.y);

    context.font = `${SETTINGS.fontSize}px ${fontFamily}`;
    context.textAlign = 'center';
    context.textBaseline = 'top';

    drawLinks(context, state);
    drawNodes(context, state);
    drawLabels(context, state);
};

const measure = (canvas) => ({ width: canvas.clientWidth, height: canvas.clientHeight, ratio: window.devicePixelRatio });

const pointOf = (event) => ({ x: event.offsetX, y: event.offsetY });

const GraphCanvas = ({ nodes, links, activeId, className }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const { current: canvas } = canvasRef;
        const context = canvas.getContext('2d');
        const controller = new AbortController();
        const listen = (type, listener) => canvas.addEventListener(type, listener, { signal: controller.signal, passive: false });
        let state = createState({ nodes, links, activeId }, measure(canvas), window.getComputedStyle(canvas).fontFamily);
        let frameId;

        const resize = () => {
            state = { ...state, size: measure(canvas) };
            canvas.width = state.size.width * state.size.ratio;
            canvas.height = state.size.height * state.size.ratio;
        };

        const frame = () => {
            state = advance(state);
            draw(context, state);
            canvas.style.cursor = cursorFor(state);
            frameId = requestAnimationFrame(frame);
        };

        listen('pointerdown', (event) => {
            canvas.setPointerCapture(event.pointerId);
            state = pointerDown(state, pointOf(event));
        });

        listen('pointermove', (event) => {
            state = pointerMove(state, pointOf(event));
        });

        listen('pointerup', (event) => {
            const node = clickedNode(state, pointOf(event));
            state = pointerUp(state, pointOf(event));
            if (node) Router.push(node.href);
        });

        listen('pointerleave', () => {
            state = pointerLeave(state);
        });

        listen('wheel', (event) => {
            event.preventDefault();
            state = wheel(state, pointOf(event), event.deltaY);
        });

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas);
        frame();

        return () => {
            controller.abort();
            resizeObserver.disconnect();
            cancelAnimationFrame(frameId);
        };
    }, [nodes, links, activeId]);

    return <canvas ref={canvasRef} aria-label="Graphe des notes et de leurs liens" className={`touch-none ${className}`} />;
};

export const Graph = ({ nodes, links, activeId }) => nodes.length > 1 && (
    <div className="relative">
        <button type="button" command="show-modal" commandfor="graph" aria-label="Voir les notes liées" title="Voir les notes liées" className="absolute top-3 right-3 z-20 text-gray-500 hover:text-gray-900 cursor-pointer">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="12" r="2.5" />
                <circle cx="18" cy="6" r="2.5" />
                <circle cx="18" cy="18" r="2.5" />
                <path d="M8.2 10.9l7.6-3.8M8.2 13.1l7.6 3.8" />
            </svg>
        </button>
        <dialog key={activeId} id="graph" closedby="any" className="m-auto w-[calc(100%-2rem)] max-w-screen-lg border border-gray-200 rounded-md shadow-xl backdrop:bg-gray-900/50">
            <GraphCanvas nodes={nodes} links={links} activeId={activeId} className="w-full h-[70vh]" />
            <form method="dialog" className="flex items-center justify-between border-t border-gray-200 px-4 py-2 text-sm">
                <Link href="/graph" className="underline text-cyan-700">Voir le graphe complet</Link>
                <button type="submit" className="text-gray-700 hover:text-gray-900 underline cursor-pointer">Fermer</button>
            </form>
        </dialog>
    </div>
);

export default ({ nodes, links }) => (
    <Layout>
        <Head>
            {generateNextSeo({
                title: 'Vue graphique',
                description: 'Toutes les notes de mon second cerveau et leurs liens',
            })}
        </Head>
        <GraphCanvas nodes={nodes} links={links} className="mt-20 w-full h-[calc(100dvh-10.5rem)] border-y border-gray-200" />
    </Layout>
);

export const getStaticProps = async () => ({ props: await getGraph() });
