import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import styles from './ProdWrapper.module.scss';
import { useSelector } from 'react-redux';
import ProdCard from '../ProdCard/ProdCard';
import Link from 'next/link';
import { API_URL } from '../../utils/api';
import axios from 'axios';

const ProdWrapper = ({ arr }) => {
    const { inputValue1, inputValue2 } = useSelector((state) => state.filter);
    const [resultArr, setResultArr] = useState([]);
    const [dataArr, setDatatArr] = useState(null);


    const fetchCategories = async (id) => {
        const url = `${API_URL}api/v1/category/categories/`+id+`/`;
        await axios
            .get(url)
            .then((res) => {
                setDatatArr(res.data);
            })
            .catch((err) => {
            });
    };

    const checkArr = (arrToCheck) => {
        if (inputValue1 !== '' && inputValue2 !== '') {
            const newPrice = arrToCheck?.filter(
                (element) => element.price >= inputValue1 && element.price <= inputValue2,
            );
            return newPrice;
        } else {
            return arrToCheck;
        }
    };
    useEffect(() => {
        const filteredArr = checkArr(arr?.products);
        setResultArr(filteredArr);
        fetchCategories(arr?.id)
    }, [arr, inputValue1, inputValue2]);
    if (dataArr?.products){
        return (
            <main>
                <div>
                    <div className={styles.ProdWrapper}>
                        <Sidebar arr={arr} />
                        <div className={styles.cards_wrapper}>
                            {dataArr?.products_data?.length > 0 ? (
                                dataArr?.products_data?.length > 0 ? (
                                    dataArr?.products_data?.map((item) => (
                                        <ProdCard
                                            href={`/category/${arr.parent_category.name}/${arr.name}/${item.id}`}
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
        <main>
            <div>
                <div className={styles.ProdWrapper}>
                    <h1>Hello</h1>
                </div>
            </div>
        </main>
    }
};

export default ProdWrapper;
