import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInputValue1, setInputValue2 } from '../../features/slices/filter-slice';
import styles from './Sidebar.module.scss';

const Sidebar = ({ arr }) => {
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');

  const dispatch = useDispatch();
  const { inputValue1, inputValue2 } = useSelector((state) => state.filter);


  const handleReset = () => {
    setFromPrice('')
    setToPrice('')
    dispatch(setInputValue1(''));
    dispatch(setInputValue2(''));
  }
  const handleFilterSubmit = (e) => {
    e.preventDefault();

    if (fromPrice !== '') {
      dispatch(setInputValue1(+fromPrice));
    } else {
      dispatch(setInputValue1(''));
    }

    if (toPrice !== '') {
      dispatch(setInputValue2(+toPrice));
    } else {
      dispatch(setInputValue2(''));
    }
  };

  return (
    <div className={styles.sidebar}>
      <h3>Найдено товаров: {arr?.length}</h3>
      <hr />
      <form className={styles.sidebar_filter} onSubmit={handleFilterSubmit}>
        <p>Цена в р.</p>
        <div className={styles.sidebar_filter__inputs}>
          <input
            type="number"
            value={fromPrice}
            onChange={(e) => setFromPrice(e.target.value)}
            placeholder="От"
            required
          />
          <input
            type="number"
            value={toPrice}
            onChange={(e) => setToPrice(e.target.value)}
            placeholder="До"
            required
          />
        </div>
        <div className={styles.sidebar_filter__btn}>
          <button onClick={() => handleReset()}>Очистить</button>
          <button type="submit">Показать</button>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
