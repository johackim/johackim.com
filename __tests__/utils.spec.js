import 'dotenv/config';
import {
    getContent,
    getContents,
    getTwitterFollowers,
    getGithubFollowers,
    getGithubStars,
    getGithubRepoStars,
} from '@lib/utils';

test('Should list contents', async () => {
    const files = await getContents();

    expect(files[0]).toHaveProperty('title');
    expect(files[0]).toHaveProperty('slug');
});

test('Should list contents filtered by tags', async () => {
    const files = await getContents({ filter: { tags: 'moc' } });

    expect(files[0].tags).toContain('moc');
});

test('Should get content', async () => {
    const file = await getContent('start');

    expect(file.slug).toEqual('start');
    expect(file.content).toContain('Bienvenue');
});

test('Should get twitter followers', async () => {
    const followers = await getTwitterFollowers('_johackim');

    expect(typeof followers).toEqual('number');
    expect(followers).toBeGreaterThan(150);
});

test('Should return 0 if twitter account does not exist', async () => {
    const followers = await getTwitterFollowers('__johackim');

    expect(followers).toEqual(0);
});

test('Should return Github followers', async () => {
    const followers = await getGithubFollowers('johackim');

    expect(typeof followers).toEqual('number');
    expect(followers).toBeGreaterThan(100);
});

test('Should return Github stars', async () => {
    const stars = await getGithubStars('johackim');

    expect(typeof stars).toEqual('number');
    expect(stars).toBeGreaterThan(100);
});

test('Should return Github repo stars', async () => {
    const stars = await getGithubRepoStars('johackim/johackim.com');

    expect(typeof stars).toEqual('number');
    expect(stars).toBeGreaterThan(2);
});
