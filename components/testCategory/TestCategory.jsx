import Link from 'next/link';
import React, { useState } from 'react';

import styles from './TestCategory.module.scss';
import TestSubCategory from './TestSubCategory';

const TestCategory = ({ routesArr }) => {
  const [hovered, setHovered] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

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

</nav>
  );
};

export default TestCategory;
