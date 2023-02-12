import React from 'react';
import { useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { logOut, updateAvatar } from 'redux/auth/auth-operations';
import { getUser } from 'redux/auth/auth-selectors';
import s from './UserMenu.module.css';
import { useAppDispatch } from 'redux/store';

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    const file = e.currentTarget.files![0];
    formData.append('avatar', file);
    dispatch(updateAvatar({ avatar: formData }));
  };

  return (
    <div className={s.userMenu}>
      <label className={s.uploadAvatar}>
        <input
          className={s.uploadInput}
          onChange={handleChange}
          type="file"
          name="avatar"
          aria-label="qweqwe"
        />
        <img className={s.avatar} src={user.avatarURL} alt="avatar" />
      </label>
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
