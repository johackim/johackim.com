import React, { useRef, useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import tailwindColors from 'tailwindcss/colors';
import { forceX, forceY } from 'd3';

const OPACITY_SCALE = 2;

const Graph = ({ nodes, links, width, height, colors, onNodeClick }) => {
    const ref = useRef();

    const [displayWidth] = useState(width || window.innerWidth);
    const [displayHeight] = useState(height || window.innerHeight);

    let hoverNode;

    useEffect(() => {
        links.forEach((link) => {
            const a = nodes.find((node) => node.id === link.source);
            const b = nodes.find((node) => node.id === link.target);

            if (a) a.neighbors = [...a?.neighbors || [], b];
            if (b) b.neighbors = [...b?.neighbors || [], a];

            if (a) a.links = [...a?.links || [], link];
            if (b) b.links = [...b?.links || [], link];
        });
    }, []);

    useEffect(() => {
        if (!ref.current) return;

        ref.current.d3Force('x', forceX());
        ref.current.d3Force('y', forceY());
        ref.current.d3Force('link').distance(70);
        ref.current.d3Force('center', null);
        ref.current.d3Force('charge').strength(-100);
    }, []);

    const [highlightNodes, setHighlightNodes] = useState(new Set());
    const [highlightLinks, setHighlightLinks] = useState(new Set());

    const handleNodeHover = (node) => {
        highlightNodes.clear();
        highlightLinks.clear();

        hoverNode = node;

        if (node) {
            highlightNodes.add(node);
            (node.neighbors || []).forEach((neighbor) => highlightNodes.add(neighbor));
            (node.links || []).forEach((link) => highlightLinks.add(link));
        }

        setHighlightNodes(highlightNodes);
        setHighlightLinks(highlightLinks);
    };

    const hexToRgb = (hex, opacity = '0.2') => {
        const [, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}, ${opacity})`;
    };

    const onZoom = ({ k }) => {
        const scale = k * OPACITY_SCALE;
        const scaledOpacity = Math.max((scale - 1) / 3.75, 0);
        const textColor = hexToRgb(colors.text, scaledOpacity);

        nodes.forEach((node) => {
            node.textColor = textColor;
        });
    };

    return (
        <ForceGraph2D
            ref={ref}
            graphData={{ links, nodes }}
            width={displayWidth - 1}
            height={displayHeight - 1}
            style={{ maxWidth: '100%', height: 'auto' }}
            nodeColor={(node) => {
                if (hoverNode) {
                    const hoverNodeNeighbors = (hoverNode.neighbors || []).map(({ id }) => id);

                    if (hoverNodeNeighbors.includes(node.id)) {
                        return colors.default;
                    }

                    if (node !== hoverNode) {
                        return hexToRgb(colors.text);
                    }
                }

                if (highlightNodes.has(node)) {
                    return colors.selected;
                }

                if (/^soon/.test(node.slug)) {
                    return colors.unexisting;
                }

                return colors.default;
            }}
            linkColor={(link) => (highlightLinks.has(link) ? colors.selected : colors.link)}
            nodeCanvasObjectMode={() => 'after'}
            onNodeHover={handleNodeHover}
            onNodeDrag={handleNodeHover}
            onNodeDragEnd={() => {
                hoverNode = null;
                highlightNodes.clear();
                highlightLinks.clear();
            }}
            onNodeClick={onNodeClick}
            onZoom={onZoom}
            nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.id;
                const fontSize = 12 / globalScale;
                ctx.font = `${fontSize}px Sans-Serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = node?.textColor || colors.text;
                ctx.transition = 'opacity .3s';

                if (hoverNode) {
                    const hoverNodeNeighbors = (hoverNode.neighbors || []).map(({ id }) => id);

                    if (node !== hoverNode && !hoverNodeNeighbors.includes(node.id)) {
                        ctx.fillStyle = hexToRgb(colors.text);
                    }

                    if (node === hoverNode) {
                        ctx.font = `${18 / globalScale}px Sans-Serif`;
                    }
                }

                ctx.fillText(label, node.x, node.y + 8);
            }}
        />
    );
};

Graph.defaultProps = {
    onNodeClick: () => {},
    links: [],
    nodes: [],
    colors: {
        selected: tailwindColors.gray['500'],
        default: tailwindColors.gray['500'],
        text: tailwindColors.gray['800'],
        link: tailwindColors.gray['300'],
        unexisting: tailwindColors.gray['300'],
    },
};

export default Graph;
