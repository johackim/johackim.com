import { PHASE_PRODUCTION_BUILD } from 'next/constants.js';
import { createSitemap, createNotes, createRss } from './lib/utils.js';

export default async (phase) => {
    if (phase === PHASE_PRODUCTION_BUILD) {
        await createSitemap();
        await createNotes();
        await createRss();
    }

    return {
        output: 'export',
        devIndicators: false,
        images: { unoptimized: true },
    };
};
