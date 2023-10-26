import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { HiShoppingCart } from 'react-icons/hi';

import styles from './Card.module.scss';

const Card = ({ image, name, price }) => {
    return (
        <>
            <div className={styles.cart}>
                <div className={styles.cart_heart}>
                    <AiOutlineHeart className={styles.cart_heart__svg} />
                </div>
                <div className={styles.cart_image}>
                    <img src={image} alt={name} />
                </div>
                <div className={styles.cart_name}>
                    <span>{name}</span>
                </div>

                <div className={styles.cart_price}>
                    <p>{price} p.</p>
                    <div className={styles.cart_icons}>
                        <HiShoppingCart className={styles.cart_icons__svg} color="#fff" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
