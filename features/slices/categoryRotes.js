// CategoryRoutes.js
 
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCategoryRoutes } from './categoryRoutesSlice';
import Cookies from 'universal-cookie';
import { API_URL } from '../../utils/api';

const CategoryRoutes = () => {
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const categoryRoutes = useSelector((state) => state?.routes);

    const fetchCategories = async () => {
        const url = `${API_URL}/api/v1/category/crud/`;
        await axios
            .get(url)
            .then((res) => {
                dispatch(setCategoryRoutes(res.data));
                cookies.set('routes', res.data);
            })
            .catch((err) => {
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div>
            {categoryRoutes?.length > 0 ? (
                categoryRoutes.map((route) => {
                    console.log(route.name, 'routes');
                    return <div key={route.id}>{route.name}</div>;
                })
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default CategoryRoutes;
