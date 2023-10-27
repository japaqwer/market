'use client'
import Link from 'next/link'
import React from 'react'
import SubCategories from '../header/SubCategories';

import styles from './MainCategories.module.scss';
import MainSubCategories from './MainSubCategories';

const MainCategories = ({routesArr}) => {
    const [hovered, setHovered] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState(null);
  return (
    <nav 
        className={styles.categories}
        onMouseEnter={() => setHovered(true)} 
        onMouseLeave={() => setHovered(false)}>
        {
            routesArr?.map(((item,index) => 
                <Link key={item.id} className={styles.linkCategory} href={`/test/${item.id}/`} onMouseEnter={() => setCurrentItem(item)}>
                    <img width={20} src={item.icon} alt="" />
                    {item.name}
                </Link>
            ))
        }
        {/* {hovered && <MainSubCategories item={currentItem} />} */}
    </nav>
  )
}

export default MainCategories