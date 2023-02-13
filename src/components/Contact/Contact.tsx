import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';
import { SiMaildotru } from 'react-icons/si';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { RiImageEditLine } from 'react-icons/ri';
import {
  getContacts,
  getIsLoading,
  getIsLoadingAvatar,
} from 'redux/contacts/contacts-selectors';
import { setEditedContact } from 'redux/contacts/contactsSlice';
import {
  deleteContact,
  updateContactAvatar,
  updateStatusContact,
} from 'redux/contacts/contacts-operations';
import s from './Contact.module.css';
import { Contact } from 'types/contact';
import { useAppDispatch } from 'redux/store';
import { ColorRing } from 'react-loader-spinner';

interface ContactProps {
  contact: Contact;
}

const ContactItem = ({ contact }: ContactProps) => {
  const { name, phone, email, favorite, avatarURL } = contact;
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsLoading);
  const isLoadingAvatar = useSelector(getIsLoadingAvatar);
  const contacts = useSelector(getContacts);

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

  const handleEdit = (id: string) => {
    const editedContact = contacts.find(contact => contact._id === id);
    dispatch(setEditedContact(editedContact));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleStatusChange = (id: string) => {
    const changedContact = contacts.find(contact => contact._id === id)!;
    dispatch(
      updateStatusContact({
        _id: changedContact._id,
        favorite: !changedContact.favorite,
      })
    );
  };

  const handleDelete = (id: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <div className={s.modal}>
              <h1>Are you sure?</h1>
              <p className={s.confirmText}>You want to delete this contact?</p>
              <div className={s.buttons}>
                <button className={s.confirmButton} onClick={onClose}>
                  No
                </button>
                <button
                  className={s.confirmButton}
                  onClick={() => {
                    dispatch(deleteContact(id));
                    dispatch(setEditedContact(null));
                    onClose();
                  }}
                >
                  Delete it
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedAvatarId(
      contacts.find(elem => elem._id === contact._id)?._id || ''
    );
    const formData = new FormData();

    const file = e.currentTarget.files![0];
    formData.append('avatar', file);
    dispatch(updateContactAvatar({ avatar: formData, _id: contact._id }));
    setModalImage('');
  };

  const handleAvatarClick = (id: string) => {
    const changedContact = contacts.find(contact => contact._id === id);
    setModalImage(changedContact?.avatarURL || '');
  };

  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) {
      setModalImage('');
    }
  };

  return (
    <div className={s.contact}>
      <div
        onClick={() => handleStatusChange(contact._id)}
        className={s.favorite}
      >
        {favorite ? (
          <AiFillHeart size="100%" />
        ) : (
          <AiOutlineHeart size="100%" />
        )}
      </div>
      <div className={s.contactInfoWrapper}>
        {avatarURL && (
          <div
            onClick={() => handleAvatarClick(contact._id)}
            className={s.uploadAvatar}
          >
            <img className={s.avatar} src={avatarURL} alt="avatar" />
            {isLoadingAvatar && editedAvatarId === contact._id && (
              <div className={s.avatarLoader}>
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    '#e15b64',
                    '#f47e60',
                    '#f8b26a',
                    '#abbd81',
                    '#849b87',
                  ]}
                />
              </div>
            )}
          </div>
        )}
        <div>
          {name && (
            <p className={s.contactName}>
              <HiOutlineUserCircle />
              {name}
            </p>
          )}

          {phone && (
            <p className={s.contactName}>
              <FiPhone />
              {phone}
            </p>
          )}

          {email && (
            <p className={s.contactName}>
              <SiMaildotru />
              {email}
            </p>
          )}
        </div>
      </div>

      <div className={s.contactButtons}>
        <button
          disabled={isLoading}
          onClick={() => handleDelete(contact._id)}
          className={s.contactsButton}
        >
          Delete
        </button>
        <button
          disabled={isLoading}
          onClick={() => handleEdit(contact._id)}
          className={s.contactsButton}
        >
          Edit
        </button>
        <a className={s.callButton} href={`tel: ${phone}`}>
          Call
        </a>
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
              <label
                className={s.changeAvatarIcon}
                onClick={() => handleAvatarClick(contact._id)}
              >
                <input
                  className={s.uploadInput}
                  onChange={handleAvatarChange}
                  type="file"
                  name="avatar"
                  aria-label="qweqwe"
                />
                <RiImageEditLine size="80%" />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactItem;
