import { useSelector } from 'react-redux';
import s from './Contacts.module.css';

import Contact from 'components/Contact/Contact';
import { getVisibleContacts } from 'redux/contacts/contacts-selectors';

const Contacts = ({ onContactEdit, contactDelete }) => {
  const contacts = useSelector(getVisibleContacts);

  return contacts.length ? (
    <ul className={s.contactsList}>
      {contacts.map(contact => (
        <li key={contact.id}>
          <Contact
            onContactEdit={onContactEdit}
            onContactDelete={contactDelete}
            contact={contact}
          />
        </li>
      ))}
    </ul>
  ) : (
    <h3 className={s.empty}>No contacts</h3>
  );
};

export default Contacts;
