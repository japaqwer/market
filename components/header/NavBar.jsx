 
import React, { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSelector } from 'react-redux';
// import { showRoutes } from '@/features/slices/categoryRoutesSlice';
import CategoriesList from './CategoriesList';

import styles from './Header.module.scss';

import Cookies from 'universal-cookie';

const NavBar = () => {
    const [hovered, setHovered] = React.useState(false);

    const cookie = new Cookies();

    const routesArr = useSelector((state) => state.routes.categoryRotes);
    const savedRoutes = routesArr ? routesArr : cookie.get('routes');
    return (
        <div
            className={styles.catalog_btn}
            onMouseLeave={() => setHovered(false)}
            onMouseEnter={() => setHovered(true)}>
            <button>
                <GiHamburgerMenu color="#fff" /> 
                <span>Каталог товаров</span>
            </button>
            <div className={styles.catalog_wrapper}>
                {hovered && <CategoriesList routesArr={savedRoutes} />}
            </div>
        </div>
    );
};

export default NavBar;
