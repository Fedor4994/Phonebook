import { useState } from 'react';

import { ThreeDots } from 'react-loader-spinner';
import s from './ContactsPage.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/FIlter/Filter';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  deleteContact,
  fetchContacts,
} from 'redux/contacts/contacts-operations';
import { getError, getIsLoading } from 'redux/contacts/contacts-selectors';
import EditForm from 'components/EditForm/EditForm';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const [editedContact, setEditedContact] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleEdit = contactForEdit => {
    setEditedContact(contactForEdit);
  };

  const handleDelete = id => {
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
                    setEditedContact(null);
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

  return (
    <div className={s.contactsPage}>
      <div className={s.contacts}>
        <h2 className={s.addContact}>Your contacts</h2>
        <Filter />
        {error && 'Something goes wrong :( '}
        {isLoading && !error ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#aaa"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <Contacts contactDelete={handleDelete} onContactEdit={handleEdit} />
        )}
      </div>
      {editedContact ? (
        <div className={s.contactForm}>
          <h2 className={s.addContact}>Edit contact</h2>
          <EditForm
            editFinish={() => handleEdit(null)}
            editedContact={editedContact}
          />
        </div>
      ) : (
        <div className={s.contactForm}>
          <h2 className={s.addContact}>Add contact</h2>
          <ContactForm />
        </div>
      )}
    </div>
  );
};

export default ContactsPage;
