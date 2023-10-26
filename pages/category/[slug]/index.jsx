 
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Page = ({ params }) => {

    const router = useRouter()
    const categoryRoutes = useSelector((state) => state.routes.categoryRotes);
    const [categoryName, setCategoryName] = useState('');
    const [subCategory, setSubCategories] = useState([]);

    useEffect(() => {
        const decodedCategorySlug = decodeURI(router.query.slug);

        const foundCategory = categoryRoutes?.find(
            (element) => element.name === decodedCategorySlug,
        );
        if (foundCategory) {
            setCategoryName(foundCategory.name);
            setSubCategories(foundCategory.subcategories);
        }
    }, [router.query.slug, categoryRoutes]);
    return (
        <main>
            <h1>page {categoryName}</h1>
            <div>
                {categoryName ? (
                    subCategory?.map((item) => (
                        <div key={item.id}>
                            <Link href={`/category/${router.query.slug}/${item.name}`}>{item.name}</Link>
                        </div>
                    ))
                ) : (
                    <p>загрузка данных</p>
                )}
            </div>
        </main>
    );
};

export default Page;
