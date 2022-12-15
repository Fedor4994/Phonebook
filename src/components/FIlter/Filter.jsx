import React from 'react';
import s from './Filter.module.css';

import { setFilter } from 'redux/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onFilterChange = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <>
      <label className={s.filterLabel}>
        Find contacts by name
        <input
          className={s.filterInput}
          type="text"
          value={filter}
          onChange={onFilterChange}
        />
      </label>
    </>
  );
};

export default Filter;
