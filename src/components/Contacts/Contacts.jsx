import React from 'react';
import s from './Contacts.module.css';
import Contact from 'components/Contact/Contact';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/selectors';

const Contacts = ({ contacts }) => {
  const filter = useSelector(getFilter);

  const visibleContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  return visibleContacts.length ? (
    <ul className={s.contactsList}>
      {visibleContacts.map(contact => (
        <li key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  ) : (
    'There are no contacts'
  );
};

export default Contacts;
