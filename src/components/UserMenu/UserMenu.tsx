import React from 'react';
import { useSelector } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import { logOut, updateAvatar } from 'redux/auth/auth-operations';
import { getIsLoading, getUser } from 'redux/auth/auth-selectors';
import s from './UserMenu.module.css';
import { useAppDispatch } from 'redux/store';
import { ColorRing } from 'react-loader-spinner';

export default function UserMenu() {
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  const isLoading = useSelector(getIsLoading);

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
        {isLoading && (
          <div className={s.avatarLoader}>
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
        )}
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
