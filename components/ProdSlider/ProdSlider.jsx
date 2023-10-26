import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './SliderCard.module.scss';
// import required modules
import { Navigation, Autoplay } from 'swiper/modules';
import SliderCard from './SliderCard';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const ProdSlider = ({ route }) => {
    const [windowWidth, setWindowWidth] = useState(null);
    const [slides, setSlides] = useState(null);
    const breakpoints = {
        320: {
            slidesPerView: 1,
        },
        480: {
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 3,
        },
        1024: {
            slidesPerView: 4,
        },
        1200: {
            slidesPerView: 5,
        },
    };

    useEffect(() => {
        setWindowWidth(window.innerWidth);
    }, []);
    useEffect(() => {
        const getSlides = () => {
            if (windowWidth >= 1440) {
                return setSlides(5);
            } else if (windowWidth >= 1024) {
                return setSlides(4);
            } else if (windowWidth >= 768) {
                return setSlides(3);
            } else {
                return setSlides(2);
            }
        };
        getSlides();
    }, [windowWidth]);

    return (
        <div>
            <ToastContainer />
            <Swiper
                rewind={true}
                spaceBetween={45}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="my-slider"
                slidesPerView={slides}
                breakpoints={breakpoints}>
                {route?.products?.length > 0 ? (
                    route?.products?.map((item, index) => (
                        <SwiperSlide key={item.id} className={styles.swiperProdSlide}>
                            <SliderCard
                                // href={`/category/${route.parent_category.name}/${route.name}/${item.id}`}
                                href={`/product/${item.id}`}
                                key={item.id}
                                image={item.img_url}
                                name={item.name}
                                price={item.price}
                                productId={item.id}
                                elem={item}
                            />
                        </SwiperSlide>
                    ))
                ) : (
                    <h3>Loading...</h3>
                )}
            </Swiper>
        </div>
    );
};

export default ProdSlider;
