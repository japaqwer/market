import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './Qwe.module.scss';
import { useSelector } from 'react-redux';
import { API_URL } from '../../../utils/api';
import axios from 'axios';
import ProdCard from '../../../components/ProdCard/ProdCard';
// import ProdCard from './[card]/index';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';
import { ToastContainer, toast } from 'react-toastify';
import ProdSlider from '../../../components/ProdSlider/ProdSlider';
const defaultImageUrl = '/logo-red.png'; // Provide the path to your default image

const Post = () => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNextModalOpen, setIsNextModalOpen] = useState(false);
    const [product, setProduct] = useState();
// ===================================================
    const [isHovered, setIsHovered] = useState(false);
    const [prods, setProds] = useState([]); 
    const [subcategories, setSubcategories] = useState([])
    
    const routesArr = useSelector((state) => state.routes.categoryRotes);

    useEffect(() => {
        console.log(routesArr, 'arrroutes');
        async function fetchData() {
            try {
                const response = await fetch('http://51.20.95.11:8000/api/v1/product/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProds(data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
        const getFilteredProds = () => {
            let subcategories = [];
            routesArr?.forEach(element => {
                element?.subcategories?.forEach(elem => {
                    subcategories.push(elem)
                })
            });
            setSubcategories(subcategories)
        }
        getFilteredProds()
        console.log(subcategories, "subs");
    }, [routesArr]);
    // ===============================================

    const fetchCategories = async (id) => {
        const url = `${API_URL}/api/v1/product/${id}/`;
        await axios
            .get(url)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((err) => {
                // Handle the error here
            });
    };
    useEffect(() => {
        if (router.query.id) {
            fetchCategories(router.query.id);
        }
    }, [router.query.id]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsNextModalOpen(false);
    };

    const openNextModal = () => {
        setIsNextModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        openNextModal();
    };

    const notify = () =>
        toast.success('Добавлен в корзинку )', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });

    const checkImage = (img) => {
        if (img?.slice(0, 4) === 'http') {
            return img;
        } else {
            return img ? API_URL + img : defaultImageUrl;
        }
    };
    return (
        <main className={styles.main}>
            <ToastContainer />
            <div>
            <h1>{product?.name}</h1>

            <div className={styles.main__wrapper}>
                <div className={styles.main__wrapper__right}>
                    <div className={styles.main__wrapper__right__text}>
                        <span>Код товара: 15515600</span>
                    </div>
                    <div className={styles.main__wrapper__right__image}>
                        <img src={checkImage(product?.img_url)} alt="" />
                    </div>
                </div>
                <div className={styles.main__wrapper__center}>
                    <span>Гарантия производителя до 5 лет</span>
                    <p>{product?.name}</p>
                    
                
                </div>

                <div className={styles.main__wrapper__left}>
                    <div className={styles.main__wrapper__left__one}>
                        <div className={styles.main__wrapper__left__one__img}>
                            <img src="/fire.svg" alt="" />
                        </div>
                        <div className={styles.main__wrapper__left__one__text}>
                            <h3>Лучшая цена</h3>
                            <p>Ниже средней рыночной</p>
                        </div>
                    </div>
                    <div className={styles.main__wrapper__left__two}>
                        <h2>{product?.price}р.</h2>

                        <button className={styles.main__wrapper__left__two__button1}>
                            В корзину
                        </button>
                        <button
                            className={styles.main__wrapper__left__two__button2}
                            onClick={openModal}>
                            Быстрый заказ
                        </button>
                        <div className={styles.main__wrapper__left__thee}>
                            <div className={styles.main__wrapper__left__thee__img}>
                                <img src="/cbr.svg" alt="" />
                            </div>
                            <div className={styles.main__wrapper__left__thee__text}>
                                <p>
                                    Спишите до 3 842 р. <br /> бонусами
                                </p>
                                <p>Начислим 96 бонусов</p>
                            </div>
                        </div>
                
                    </div>
                </div>
                {isModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modal__wrapper}>
                            <button className={styles.modal__wrapper__button} onClick={closeModal}>
                                X
                            </button>

                            <form className={styles.modal__wrapper__input}>
                                <input type="text" placeholder="Имя :" id="username" required />

                                <input type="text" placeholder="Адрес" id="adress" required />

                                <input
                                    type="number"
                                    placeholder="Номер телефона :"
                                    id="number"
                                    required
                                />
                            </form>
                            <button
                                className={styles.modal__wrapper__button}
                                onClick={handleSubmit}>
                                Продолжить
                            </button>
                        </div>
                    </div>
                )}

                {isNextModalOpen && (
                    <div className={styles.modal}>
                        <div className={styles.modal__wrapper}>
                            <button className={styles.modal__wrapper__button} onClick={closeModal}>
                                X
                            </button>

                            
                            <p>{product?.name}</p>
                        <h2>{product?.price}р.</h2>
                            <button
                                className={styles.modal__wrapper__button}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit(e);
                                    notify();
                                }}>
                                Отправить
                            </button>
                        </div>
                    </div>
                )}
                </div>
            </div>
            <div className={styles.two}>
               <div className={styles.two__wrapper}>
                <h3>Преимущества {product?.name}</h3>
                    <p>- Не выделяет токсичных выхлопов - работать в закрытом помещении</p>
                    <p>- Низкий уровень шума - комфорт во время работы</p>
                    <p>- Основной тормоз мгновенного действия обеспечивает высокую безопасность работы</p>
                    <p>- Автоматическая система смазки цепи дозировано подает масло в зависимости от нагрузки</p>
                    <p>- Термопредохранитель для защиты двигателя от перегрузки при тяжелой работе</p>
                    <p>- Уловитель цепи и клавиша блокировки включения для дополнительной безопасности</p>
               </div>
               <div className={styles.two__text}>
                <span>*Производитель оставляет за собой право без уведомления дилера менять характеристики, внешний вид, комплектацию товара и место его производства. Указанная информация не является публичной офертой</span>
               </div>
               <div className={styles.podborka}>
                <h2>Ваша подборка популярных товаров</h2>
                <ProdSlider route={subcategories[0]} />
            </div>
            </div>
        </main>
    );
};

export default Post;