import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiShoppingCart } from 'react-icons/hi';

import styles from './CategoryCard.module.scss';
import { API_URL } from '../../utils/api';
import Link from 'next/link';

const CategoryCard = ({ name,  href, image_url }) => {
    // const checkImage = (img) => {
    //     if (img.slice(0, 4) == 'http') {
    //         return img;
    //     } else {
    //         return API_URL + img;
    //     }
    // };
    // const result = checkImage(image);
    return (
        <>
            <div className={styles.cart}>
                <div className={styles.cart_heart}>
                    {/* <AiOutlineHeart className={styles.cart_heart__svg} /> */}
                </div>
                <div className={styles.cart_image}>
                    {/* <img src={image_url} alt={name} /> */}
                </div>
                <div className={styles.cart_name}>
                    <span>{name}</span>
                </div>

              
                <Link href={href}>продолжить</Link>
            </div>
        </>
    );
};

export default CategoryCard;
