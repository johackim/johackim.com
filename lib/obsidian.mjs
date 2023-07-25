import 'dotenv/config';
import fs from 'fs';

const CONTENT_FOLDER = process.env.CONTENT_FOLDER || `${process.cwd()}/content`;

const downloadObsidianVault = async () => {
    let files = await fetch(`https://publish-01.obsidian.md/cache/${process.env.OBSIDIAN_SITE_ID}`)
        .then((res) => res.json())
        .catch(() => false);

    files = Object.entries(files).filter(([key]) => key.includes('.md'));

    fs.mkdirSync(CONTENT_FOLDER, { recursive: true });

    for await (const [file] of files) {
        const url = `https://publish-01.obsidian.md/access/${process.env.OBSIDIAN_SITE_ID}/${encodeURIComponent(file)}`;
        const content = await fetch(url, { cache: 'reload' }).then((res) => res.text()).catch(() => false);

        fs.writeFileSync(`${CONTENT_FOLDER}/${file}`, content);
    }
};

(async () => {
    await downloadObsidianVault();
})();
