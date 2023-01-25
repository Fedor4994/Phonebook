import { useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { logOut } from 'redux/auth/auth-operations';
import { getUser } from 'redux/auth/auth-selectors';
import s from './UserMenu.module.css';
import { useAppDispatch } from 'redux/store';

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);

  return (
    <div className={s.userMenu}>
      <span className={s.welcome}>You're welcome, {user.name}</span>
      <button
        className={s.logoutButton}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        <FiLogOut size={25} color="red" />
      </button>
    </div>
  );
}
