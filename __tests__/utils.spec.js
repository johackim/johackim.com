import 'dotenv/config';
import { getContent, getContents } from '@lib/utils';

test('Should list contents', async () => {
    const files = await getContents();

    expect(files[0]).toHaveProperty('title');
    expect(files[0]).toHaveProperty('slug');
});

test('Should list contents filtered by tags', async () => {
    const files = await getContents({ filter: { tags: 'type/moc' } });

    expect(files[0].tags).toContain('type/moc');
});

test('Should get content', async () => {
    const file = await getContent('start');

    expect(file.slug).toEqual('start');
    expect(file.content).toContain('Bienvenue');
});
