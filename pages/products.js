import { NextSeo } from 'next-seo';

import DefaultLayout from '@components/defaultLayout';
import Product from '@components/product';
import { getContents } from '@lib/utils';

const Page = ({ products = [] }) => (
    <section className="mt-20">
        <div className="container m-auto px-4 md:max-w-screen-md">
            <h1 className="text-center font-bold text-3xl">Protégez votre vie privée, auto-hébergez vos données et devenez indépendant numériquement.</h1>
            <h2 className="text-center md:text-lg mb-8">Consultez mon catalogue complet de produits et découvrez tout ce que j'ai à vous offrir</h2>

            <div className="grid gap-4">
                {products.map((product) => (
                    <Product key={product.slug} {...product} tags={product.productTags} />
                ))}
            </div>
        </div>
    </section>
);

export const getStaticProps = async () => {
    const products = await getContents({ filter: { tags: ['type/premium'] } });

    return { props: { products } };
};

Page.getLayout = (page) => (
    <DefaultLayout>
        <NextSeo title="Produits" />
        {page}
    </DefaultLayout>
);

export default Page;
