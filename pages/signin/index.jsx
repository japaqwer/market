'use client';

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styles from './Signin.module.scss';
import { FaArrowRight } from 'react-icons/fa';
import { setUser } from '../../features/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { API_URL } from '../../utils/api';

const TokenContext = React.createContext();

const Signin = () => {
    const router = useRouter();
    const dispath = useDispatch();
    const [state, setState] = useState({
        username: '',
        password: '',
        password2: '',
    });

    const [accessToken, setAccessToken] = useState(null);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setState({
            ...state,
            [e.target.id]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: state.username,
            password: state.password,
            password2: state.password2,
        };
        const url = `${API_URL}/api/v1/account/register/`;
        axios
            .post(url, data)
            .then(async (res) => {
                const accessToken = res.data['access'];
                const refreshToken = res.data['refresh'];
                sessionStorage.setItem('access_token', accessToken);
                sessionStorage.setItem('refresh_token', refreshToken);
                setAccessToken(accessToken);
                console.log(res.data);
                dispath(setUser(res.data));
                sessionStorage.setItem('user', JSON.stringify(res.data));
                router.push('/');
            })
            .catch((err) => {
                console.log(err.response?.data);
            });
    };

    return (
        <main>
            <div className={styles.signup}>
                <div className={styles.signup__wrapper}>
                    <div className={styles.signup__wrapper__content}>
                        <div className={styles.signup__wrapper__content__one}>
                            <div className={styles.signup__wrapper__content__one__text}>
                                <h1>Регистрация</h1>
                                <p>Зарегистрируйтесь, заполнив следующие поля:</p>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className={styles.signup__wrapper__content__one__input}>
                                <input
                                    type="text"
                                    placeholder="Имя пользователя"
                                    id="username"
                                    value={state.username}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="password"
                                    placeholder="Пароль"
                                    id="password"
                                    value={state.password}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="password"
                                    placeholder="Подтвердите пароль"
                                    id="password2"
                                    value={state.password2}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="flex gap-[15px] bg-[#d60000] text-[#fff] px-[30px] py-[10px] rounded-[15px] text-center">
                                    Продолжить
                                    <FaArrowRight
                                        className={
                                            styles.signup__wrapper__content__one__button__arrow
                                        }
                                    />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signin;

export function TokenProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('access_token'));
    return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>;
}

export function useAccessToken() {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useAccessToken must be used within a TokenProvider');
    }
    return context.token;
}
