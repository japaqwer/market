 
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import CategoryRoutes from '../features/slices/categoryRotes';
import ProdCard from '../components/ProdCard/ProdCard';
import Image from 'next/image';

import styles from '../styles/Home.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import ProdSlider from '../components/ProdSlider/ProdSlider';
import { useSelector } from 'react-redux';
import MainCategories from '../components/mainCategories/MainCategories';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    return (
        <main>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <CategoryRoutes />
            <div className={styles.main_wrapper}>
                <div className={styles.main_wrapper__left}>
                    <MainCategories routesArr={routesArr} />
                </div>
                <div className={styles.main_wrapper__right}>
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="mySwiper">
                        <Swiper
                            rewind={true}
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            navigation={isHovered}
                            modules={[Autoplay, Navigation]}>
                            <SwiperSlide>
                                <img
                                    src="https://cdn.vseinstrumenti.ru/imgtmbnf/992x416/res/img/AdFox/992x416_glavnaya_ov_1692194485.jpg"
                                    alt=""
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://cdn.vseinstrumenti.ru/imgtmbnf/992x416/res/img/AdFox/992-416-3_1694167317.jpg"
                                    alt=""
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://cdn.vseinstrumenti.ru/imgtmbnf/992x416/res/img/AdFox/992x416_glavnaya_ov__5__1689679858.jpg"
                                    alt=""
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://cdn.vseinstrumenti.ru/imgtmbnf/992x416/res/img/AdFox/gigani-k-_a-_kop-_l-_-_-992-_416_1676886082.jpg"
                                    alt=""
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://cdn.vseinstrumenti.ru/imgtmbnf/992x416/res/img/AdFox/992x416_glavnaya_ov__11__1694812347.jpg"
                                    alt=""
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://cdn.vseinstrumenti.ru/imgtmbnf/992x416/res/img/AdFox/992-_416_ov_1693720247.jpg"
                                    alt=""
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img
                                    src="https://cdn.vseinstrumenti.ru/res/content/banners/home_page_top_placeholder_2.jpg"
                                    alt=""
                                />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className={styles.popular}>
                        <div>
                            <img
                                src="https://cdn.vseinstrumenti.ru/res/content/page_templates/8ca1db2f0b695a32d644fdae1adf6b3a.jpeg"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                src="https://cdn.vseinstrumenti.ru/res/content/page_templates/e02736054a0becf739b254aa5c5717f9.jpeg"
                                alt=""
                            />
                        </div>
                        <div>
                            <img
                                src="https://cdn.vseinstrumenti.ru/res/content/page_templates/9766f966ed60757e90704ae6e037a44a.jpeg"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.podborka}>
                <h2>Ваша подборка популярных товаров</h2>
                <ProdSlider route={subcategories[0]} />
            </div>
            <div className={styles.podborka}>
                <h2>Ваша подборка товаров со скидкой</h2>
                <ProdSlider route={subcategories[1]} />
            </div>
            <div className={styles.podborka}>
                <h2>Ваша подборка из нашего магазина</h2>
                <ProdSlider route={subcategories[2]} />
            </div>
            <div className={styles.podborka}>
                <h2>Ваша подборка из нашего магазина</h2>
                <ProdSlider route={subcategories[3]} />
            </div>
            <div className={styles.podborka}>
                <h2>Ваша подборка из нашего магазина</h2>
                <ProdSlider route={subcategories[4]} />
            </div>
            <div className={styles.podborka}>
                <h2>Ваша подборка из нашего магазина</h2>
                <ProdSlider route={subcategories[5]} />
            </div>
        </main>
    );
}
