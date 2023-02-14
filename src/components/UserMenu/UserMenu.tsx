import { useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { logOut } from 'redux/auth/auth-operations';
import { getUser } from 'redux/auth/auth-selectors';
import s from './UserMenu.module.css';
import { useAppDispatch } from 'redux/store';

import Avatar from 'components/Avatar/Avatar';

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);

  return (
    <div className={s.userMenu}>
      <Avatar user={user} />

      <div className={s.userWrapper}>
        <span className={s.welcome}>{user.name}</span>
        <button
          className={s.logoutButton}
          type="button"
          onClick={() => dispatch(logOut())}
        >
          <FiLogOut size={22} color="red" />
        </button>
      </div>
    </div>
  );
}
