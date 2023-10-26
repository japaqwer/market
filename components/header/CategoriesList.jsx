import React from 'react';
import styles from './Header.module.scss';
import Link from 'next/link';
import SubCategories from './SubCategories';
import Cookies from 'universal-cookie';

const CategoriesList = ({ routesArr = [] }) => {
    const [hovered, setHovered] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState(null);

    const cookie = new Cookies();

    const savedRoutes = cookie.get('routes') || routesArr;

    return (
        <div
            className={styles.categories}
            onMouseLeave={() => setHovered(false)}
            onMouseEnter={() => setHovered(true)}>
            {routesArr.length > 0 ? (
                savedRoutes.map((item, index) => (
                    <div
                        key={item.id}
                        className={styles.SubCategories}
                        onMouseEnter={() => setCurrentItem(item)}>
                        <p>
                            <Link href={`/category/${item.name}`}>{item.name}</Link>
                        </p>
                    </div>
                ))
            ) : (
                <p>zagruzka dannyx</p>
            )}

            {hovered && <SubCategories item={currentItem} />}
        </div>
    );
};

export default CategoriesList;
