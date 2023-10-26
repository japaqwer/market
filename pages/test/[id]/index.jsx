import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../../../components/ProdWrapper/ProdWrapper.module.scss';
import { useSelector } from 'react-redux';
import { API_URL } from '../../../utils/api';
import axios from 'axios';
import ProdCard from '../../../components/ProdCard/ProdCard';
// import ProdCard from './[card]/index';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';

const Post = () => {
    const router = useRouter();
    const [arrData, setArrData] = useState();
    console.log('====================================');
    console.log(router.query.id);
    console.log('====================================');

    const fetchCategories = async (id) => {
        const url = `${API_URL}/api/v1/category/categories/${id}/`;
        await axios
            .get(url)
            .then((res) => {
                setArrData(res.data);
            })
            .catch((err) => {
        });
    };
    useEffect(() => {
        if (router.query.id) {
            fetchCategories(router.query.id);
        }
    }, [router.query.id]);

    console.log(arrData)
    if (arrData?.products===true){
        return (
            <main>
                <div>
                    <div className={styles.ProdWrapper}>
                        <div className={styles.cards_wrapper}>
                            {arrData?.products_data?.length > 0 ? (
                                arrData?.products_data?.length > 0 ? (
                                    arrData?.products_data?.map((item) => (
                                   
                                        <ProdCard
                                            href={`/product/${item.id}`}
                                            key={item.id}
                                            image={item.image1}
                                            name={item.name}
                                            price={item.price}
                                            productId={item.id}
                                            elem={item}
                                        />
                                       
                                    ))
                                ) : (
                                    <p>Продукты не найдены</p>
                                )
                            ) : (
                                <p>Загрузка ...</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        );
    }else{
        return (
            <>
              <main>
                <div>
                    <div className={styles.ProdWrapper}>
                        <div className={styles.cards_wrapper}>
                            {arrData?.subcategories?.length > 0 ? (
                                arrData?.subcategories?.length > 0 ? (
                                    arrData?.subcategories?.map((item) => (
                                        <CategoryCard
                                            href={`/test/${item.id}`}
                                            key={item.id}
                                            name={item.name}
                                            price={item.price}
                                            productId={item.id}
                                            elem={item}
                                        />
                                    ))
                                ) : (
                                    <p>Продукты не найдены</p>
                                )
                            ) : (
                                <p>Загрузка ...</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            </>
        );
    }
};

export default Post;