import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from '../../pages/product/[id]/Qwe.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import axios from 'axios';
import { API_URL } from '../../utils/api';

const Page = ({id, name} ) => {
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isNextModalOpen, setIsNextModalOpen] = useState(false);
    const [product, setProduct] = useState([]);

    useLayoutEffect(() => {
        const categoryName = router?.query?.slug;
        const subCategoryName = router?.query?.podcategor;
        const prodId = router?.query?.id;

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${API_URL}`+ id);
                const data = response.data;
                const findCategory = data?.find((elem) => elem.name === categoryName);
                const findSubCategory = findCategory?.subcategories?.find(
                    (elem) => elem.name === subCategoryName,
                );
                const getProductSubs = findSubCategory?.products?.find((elem) => elem.id == prodId);
                setProduct(getProductSubs);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProduct();
    }, []);

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
        if (img?.slice(0, 4) == 'http') {
            return img;
        } else {
            return API_URL + img;
        }
    };
    const result = checkImage(product?.image1);
    return (
        <main className={styles.main}>
            <ToastContainer />
            <h1>{product?.name}qwe</h1>

            <div className={styles.main__wrapper}>
                <div className={styles.main__wrapper__right}>
                    <div className={styles.main__wrapper__right__text}>
                        <span>Код товара: 15515600</span>
                    </div>
                    <div className={styles.main__wrapper__right__image}>
                        <img src={result} alt="" />
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

                            <p>21312423512453451</p>
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
        </main>
    );
};

export default Page;
