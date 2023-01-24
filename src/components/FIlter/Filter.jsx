import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/contacts/filterSlice';
import { getFilter } from 'redux/contacts/contacts-selectors';
import s from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onFilterChange = event => {
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
