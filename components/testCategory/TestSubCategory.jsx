import React from 'react'

import styles from './TestCategory.module.scss'
import Link from 'next/link';
import { API_URL } from '../../utils/api';

const TestSubCategory = ({item}) => {
  const fetchNext = async (id) => {
    const url = `${API_URL}api/v1/category/categories/`+id+`/`;
    await axios
        .get(url)
        .then((res) => {
            setDatatArr(res.data);
        })
        .catch((err) => {
        });
  };
  const onNext = (id) => {
    fetchNext(id)
  }
  return (
    <div className={styles.subcategories}>
      <h3>{item?.name}</h3>
        {item?.subcategories?.map((elem) => (
            <p key={elem.id}>
                <Link href={`/test/${elem.id}/`}>
                    {elem.name}
                </Link>
            </p>
        ))}
    </div>
  )
}

export default TestSubCategory