import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import ProdWrapper from '../../../../components/ProdWrapper/ProdWrapper';
import Test from '../../../../components/ProdWrapper/Test'
import { useRouter } from 'next/router';

const Page = ({ params }) => {
    const router = useRouter();

    const [products, setProducts] = useState([]);
    const categoryRoutes = useSelector((state) => state.routes.categoryRotes);

    const [categoryName, setCategoryName] = useState('');
    const [subcategoryName, setSubcategoryName] = useState('');

    useEffect(() => {
        const decodedCategorySlug = decodeURI(router.query.slug);
        console.log();
        const decodedSubcategorySlug = decodeURI(router.query.podcategor);

        const foundCategory = categoryRoutes.find(
            (element) => element.name === decodedCategorySlug,
        );

        if (foundCategory) {
            setCategoryName(foundCategory.name);

            const foundSubcategory = foundCategory.subcategories.find(
                (subcategory) => subcategory.name === decodedSubcategorySlug,
            );
            if (foundSubcategory) {
                setSubcategoryName(foundSubcategory.name);
                setProducts(foundSubcategory);
            }
        }
    }, [router.query.slug, router.query.podcategor, categoryRoutes]);

    return (
        <main>
            <h3>
                Категория: <Link href={`/category/${categoryName}`}>{categoryName}</Link>
                <Link href={`/category/${categoryName}/${subcategoryName}`}>{subcategoryName}</Link>
            </h3>
            {/* <ProdWrapper arr={products} router={router} /> */}
            <Test router={router}/>
        </main>
    );
};

export default Page;
