import React, { useState, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { HiShoppingCart } from 'react-icons/hi';

import styles from './SliderCard.module.scss';
import { API_URL } from '../../utils/api';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';


function ProductCard({ name, price, image, productId, accessToken, href, elem }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [cartProductId, setCartProductId] = useState(null);
    const [favoritesArr, setFavouritesArr] = useState([])

    const favArr = JSON.parse(localStorage.getItem('favourites')) || []; 
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };
    const handleCartBtn = () => {
        setCartProductId(productId)
    }

    
    useEffect(() => {
        let accToken = sessionStorage.getItem('access_token')
        if (cartProductId !== null) {
            const headers = {
                Authorization: `Bearer ${accToken}`,
                'Content-Type': 'application/json',
            };
            fetch(`${API_URL}/api/v1/cart/add_to_cart/${cartProductId}/`, {
                method: 'POST',
                headers: headers,
            })
            .then((response) => {
                if (response.ok) {
                    console.log('response 200!');

                    toast.success("Вы успешно добавили товар в корзину", {});
                } else {
                    console.log('response not ok');
                    toast.error("Вы должны войти или зарегестрироваться", {});
                }
            })
            .catch((error) => {
                console.error('Произошла ошибка при запросе:', error);
            });
        }
    }, [cartProductId]); 

    const handleAddFav = (item) => {     
        if (favArr.some(favItem => favItem.id === item.id)) {
            return
        }
        favArr.push(item);
        localStorage.setItem('favourites', JSON.stringify(favArr));
        setFavouritesArr(favArr)
      };
    const delFav = (id) => {
        const favArr = JSON.parse(localStorage.getItem('favourites')) || [];    
        const uptFavArr = favArr.filter(item => item.id != id)
        localStorage.setItem('favourites', JSON.stringify(uptFavArr))
    }

    const fullImageUrl = (image) => {
        if (image.startsWith('https')) {
            return image
        } else {
            return 'https://max.kg/images/xempty-photo.png.pagespeed.ic.n6GY_KSzTq.png'
           
        }
    }
    const resImage = fullImageUrl(image)
    return (
        <div className={styles.card}>
            <div className={styles.card_heart} onClick={toggleFavorite}>
                {favArr?.some(favItem => favItem.id === productId) ? (
                    <AiFillHeart className={styles.card_heart__svg} color="#d60000" onClick={() => delFav(productId)} />
                ) : (
                    <AiOutlineHeart className={styles.card_heart__svg} onClick={() => handleAddFav(elem)} />
                )}
            </div>
            <div className={styles.card_image}>
                {/* <img src={result} alt={name} /> */}
                <img src={resImage} alt={name} />
            </div>
            <div className={styles.card_name}>
                <span>{name}</span>
            </div>

            <div className={styles.card_price}>
                <p>{price} p.</p>
                <div className={styles.card_icons}>
                    <HiShoppingCart
                        className={styles.card_icons__svg}
                        color="#fff"
                        onClick={() => handleCartBtn(name)}
                    />
                </div>    
            </div>
            <Link href={href}>
                <button>Подробнее</button>
            </Link>
        </div>
    );
}

export default ProductCard;