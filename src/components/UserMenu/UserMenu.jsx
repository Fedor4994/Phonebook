import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'redux/auth/auth-operations';
import { getUser } from 'redux/auth/auth-selectors';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  return (
    <>
      <span>Добро пожаловать, {user.name}</span>
      <button type="button" onClick={() => dispatch(logOut())}>
        Выйти
      </button>
    </>
  );
}
