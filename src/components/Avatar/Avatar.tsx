import AvatarLoader from 'components/AvatarLoader/AvatarLoader';
import React, { useState, useEffect } from 'react';
import { RiImageEditLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { updateAvatar } from 'redux/auth/auth-operations';
import { getIsLoading } from 'redux/auth/auth-selectors';
import { updateContactAvatar } from 'redux/contacts/contacts-operations';
import { getIsLoadingAvatar } from 'redux/contacts/contacts-selectors';
import { useAppDispatch } from 'redux/store';
import { User } from 'types/auth';
import { Contact } from 'types/contact';
import s from './Avatar.module.css';

interface AvatarProps {
  user?: Pick<User, 'email' | 'name' | 'avatarURL'>;
  contact?: Contact;
}

const Avatar = ({ user, contact }: AvatarProps) => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsLoading);
  const isLoadingContactAvatar = useSelector(getIsLoadingAvatar);

  const [modalImage, setModalImage] = useState('');
  const [editedAvatarId, setEditedAvatarId] = useState('');

  const onEscClose = (event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      setModalImage('');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscClose);
    return () => {
      window.removeEventListener('keydown', onEscClose);
    };
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();

    const file = e.currentTarget.files![0];
    formData.append('avatar', file);
    if (contact) {
      setEditedAvatarId(contact._id);
      dispatch(
        updateContactAvatar({ avatar: formData, _id: contact._id })
      ).finally(() => setEditedAvatarId(''));
    } else {
      setEditedAvatarId('');
      dispatch(updateAvatar({ avatar: formData }));
    }
    setModalImage('');
  };

  const handleAvatarClick = () => {
    if (contact) {
      setModalImage(contact.avatarURL);
    } else {
      setModalImage(user?.avatarURL || '');
    }
  };

  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      setModalImage('');
    }
  };

  return (
    <>
      <div onClick={handleAvatarClick} className={s.uploadAvatar}>
        {contact ? (
          <img className={s.avatar} src={contact.avatarURL} alt="avatar" />
        ) : (
          <img className={s.avatar} src={user?.avatarURL || ''} alt="avatar" />
        )}

        {isLoading && user && <AvatarLoader />}

        {isLoadingContactAvatar &&
          contact &&
          editedAvatarId === contact._id && <AvatarLoader />}
      </div>

      {modalImage && (
        <div onClick={closeModal} className={s.backdrop}>
          <div className={s.avatarModal}>
            <div
              style={{
                position: 'relative',
              }}
            >
              <img className={s.modalImage} src={modalImage} alt="big-avatar" />
              <label className={s.changeAvatarIcon}>
                <input
                  className={s.uploadInput}
                  onChange={handleAvatarChange}
                  type="file"
                  name="avatar"
                />
                <RiImageEditLine size="80%" />
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Avatar;
