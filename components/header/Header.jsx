import React, { useState, useEffect } from 'react';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { AiOutlinePercentage, AiFillHeart } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import styles from './Header.module.scss';
import Link from 'next/link';
import axios from 'axios';
import NavBar from './NavBar';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setUser } from '../../features/slices/userSlice';

const Header = () => {
    const cookie = new Cookies();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuth, setIsAuth] = useState('');

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    const [searchResult, setSearchResult] = useState('');
    const [searchId, setSearchId] = useState('');
    const [userHead, setUserHead] = useState(null);
    
    const [adminInfo, setAdminInfo] = useState(null);

    const dispath = useDispatch();

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        const userLocal = sessionStorage.getItem('user');
        const userStorage = JSON.parse(userLocal || '{}');
        setUserHead(user);
        dispath(setUser(userStorage));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`ttps://sel-market-back.com/api/v1/product/${id}/`, {
                    headers: { Authorization: 'Bearer ' + sessionStorage.getItem('access_token') },
                });
                setProducts(response.data);
                if (response.data.length === 0) {
                    // router.push('/');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchData();
        const getNumberHeader = async () => {
            try {
                const response = await axios.get(`https://sel-market-back.com/api/v1/payment/info-card/`, {
                    headers: { Authorization: 'Bearer ' + sessionStorage.getItem('access_token') },
                });
                setAdminInfo(response.data)
                // console.log(response.data);
                if (response.data.length === 0) {
                    // router.push('/');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        getNumberHeader();
    }, []);

    useEffect(() => {
        const fetchCategories = async (id) => {
            try {
                const response = await axios.get(
                    `https://sel-market-back.com/api/v1/product/${id}/`,
                    {
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
                        },
                    },
                );
                setSearchResult(response.data);
                console.log();
                console.log(response.data, 'lol');
                if (response.data.length === 0) {
                    // router.push('/');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchCategories();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        setShowResults(e.target.value !== '');
    };

    const handleLogOut = () => {
        setIsAuth(false);
        sessionStorage.removeItem('access_token');
        dispath(removeUser());
    };

    const inputSearchHandler = (category) => {
        setSearchId(category);
    };

    return (
        <header className={styles.header}>
            <div className={styles.header_wrapper}>
                <div className={styles.header_wrapper_top}>
                    <div className={styles.header_wrapper_top__images}>
                        <Link href={`/`}>
                            <img className={styles.logo} src="/logo-red-1.svg" alt="Logo" />
                        </Link>
                        {/* <img className={styles.image} src="/skidki.png" alt="" /> */}
                    </div>
                    <div className={styles.header_wrapper_top__text}>
                        <p>
                            Всё для дома, дачи,
                            <br /> стройки и ремонта
                        </p>
                    </div>
                    {/* ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss */}
                    <div className={styles.header_wrapper_top__phone}>
                        <p>
                            {/* <a href={`tel:+${adminInfo['номер']}`}>{adminInfo['номер']}</a> */}
                            {/* <a href="/">{adminInfo['номер']}</a> */}
                        </p>
                        <p>Звонок бесплатный 05:00 – 22:00</p>
                    </div>
                    {user?.user ? (
                        <div className="flex gap-2 items-center">
                            <p>{user?.user?.username}</p>
                            <button
                                onClick={() => handleLogOut()}
                                className="px-[15px] py-[5px] rounded-[5px] bg-[#d60000] text-[#fff]">
                                Выйти
                            </button>
                        </div>
                    ) : (
                        <div className={styles.header_wrapper_top__auth}>
                            <FaUser
                                color="#d60000"
                                className={styles.header_wrapper_top__auth__svg}
                            />
                            <Link href="/signup" onMouseEnter={openModal} onMouseLeave={closeModal}>Войти</Link>
                            <hr />
                            <Link href="/signin" onMouseEnter={openModal} onMouseLeave={closeModal}>
                                Регистрация
                            </Link>
                        </div>
                    )}
                </div>
                <div className={styles.header_wrapper_btm}>
                    <div className={styles.header_wrapper_btm__catalog}>
                        {/* <NavBar /> */}
                    </div>
                  
                    <form action="" className={styles.header_wrapper_btm__search}>
                        <input
                            type="text"
                            required
                            placeholder="Поиск среди 1 000 000 товаров. Введите запрос"
                            value={searchQuery}
                            onChange={handleInputChange}
                        />
                        <button type="submit">
                            <FiSearch />
                        </button>
                    </form>
                    <div className="flex gap-4">
                        <Link href="/favourites" className={styles.header_wrapper_btm__tools}>
                            <AiFillHeart color="#d60000" />
                            <span>Избранное</span>
                        </Link>

                        <Link href="/cart" className={styles.header_wrapper_btm__tools}>
                            <FaShoppingCart color="#d60000" />
                            <span>Корзина</span>
                        </Link>
                    </div>
                </div>
                <div className={styles.product_input}>
                    {showResults && (
                        <div className={styles.productList}>
                            {filteredProducts.length === 0 ? (
                                <p>Подходящие товары не найдены.</p>
                            ) : (
                                filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className={styles.product}
                                        onMouseEnter={() => inputSearchHandler(product.category)}>
                                        <Link
                                            href={`/category/${searchResult?.parent_category?.name}/${searchResult?.name}/${product.id}`}>
                                            <div>
                                                <img src={product.image1} alt={product.name} />
                                            </div>
                                            <div>
                                                <h3>{product.name}</h3>
                                                <p>{product.price} p.</p>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
            <hr />
        </header>
    );
};

export default Header;
