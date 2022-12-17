import React from 'react';

import { ThreeDots } from 'react-loader-spinner';
import s from './ContactsPage.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/FIlter/Filter';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchContacts } from 'redux/contacts/contacts-operations';
import { getError, getIsLoading } from 'redux/contacts/contacts-selectors';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
          <Contacts />
        )}
      </div>
      <div className={s.contactForm}>
        <h2 className={s.addContact}>Add contact</h2>
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactsPage;
