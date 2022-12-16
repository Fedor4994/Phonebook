import { useDispatch, useSelector } from 'react-redux';
import s from './Contacts.module.css';

import Contact from 'components/Contact/Contact';
import { getVisibleContacts } from 'redux/contacts/contacts-selectors';
import { deleteContact } from 'redux/contacts/contacts-operations';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getVisibleContacts);

  const onContactDelete = id => {
    dispatch(deleteContact(id));
  };

  return contacts.length ? (
    <ul className={s.contactsList}>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Contact onContactDelete={onContactDelete} contact={contact} />
        </li>
      ))}
    </ul>
  ) : (
    'There are no contacts'
  );
};

export default Contacts;
