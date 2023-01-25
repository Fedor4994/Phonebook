import { ChangeEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { setFilter } from 'redux/contacts/filterSlice';
import { getFilter } from 'redux/contacts/contacts-selectors';
import s from './Filter.module.css';
import { useAppDispatch } from 'redux/store';

const Filter = () => {
  const dispatch = useAppDispatch();
  const filter = useSelector(getFilter);

  const onFilterChange: ChangeEventHandler<HTMLInputElement> = event => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <div className={s.filterForm}>
      <label className={s.filterLabel}>
        <input
          placeholder="Search"
          className={s.filterInput}
          type="text"
          value={filter}
          onChange={onFilterChange}
        />
      </label>
    </div>
  );
};

export default Filter;
