import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  fetchContacts,
  fetchFavoriteContacts,
} from 'redux/contacts/contacts-operations';
import ContactForm from 'components/ContactForm/ContactForm';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/FIlter/Filter';
import EditForm from 'components/EditForm/EditForm';
import {
  getEditedContact,
  getError,
  getIsLoading,
  getVisibleContacts,
} from 'redux/contacts/contacts-selectors';
import s from './ContactsPage.module.css';
import { useAppDispatch } from 'redux/store';
import ContactsGroupSelect from 'components/ContactsGroupSelect/ContactsGroupSelect';
import ScrollButton from 'components/ScrollButton/ScrollButton';

const ContactsPage = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const editedContact = useSelector(getEditedContact);
  const visibleContacts = useSelector(getVisibleContacts);

  const [isFavoriteContacts, setIsFavoriteContacts] = useState(false);

  useEffect(() => {
    isFavoriteContacts
      ? dispatch(fetchFavoriteContacts())
      : dispatch(fetchContacts());
  }, [dispatch, isFavoriteContacts]);

  return (
    <div className={s.contactsPage}>
      <div className={s.contacts}>
        <h2 className={s.addContact}>Your contacts</h2>
        <Filter />
        <ContactsGroupSelect
          onGroupChange={setIsFavoriteContacts}
          isFavoriteContacts={isFavoriteContacts}
        />
        {error && 'Something goes wrong :( '}
        {isLoading && !error ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#aaa"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        ) : (
          <Contacts visibleContats={visibleContacts} />
        )}
      </div>
      {editedContact ? (
        <div className={s.contactForm}>
          <h2 className={s.addContact}>Edit contact</h2>
          <EditForm />
        </div>
      ) : (
        <div className={s.contactForm}>
          <h2 className={s.addContact}>Add contact</h2>
          <ContactForm />
        </div>
      )}

      <ScrollButton />
    </div>
  );
};

export default ContactsPage;
