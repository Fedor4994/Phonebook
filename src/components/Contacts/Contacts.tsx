import { useSelector } from 'react-redux';
import s from './Contacts.module.css';
import ContactItem from 'components/Contact/Contact';
import {
  getContacts,
  getVisibleContacts,
} from 'redux/contacts/contacts-selectors';

const Contacts = () => {
  const visibleContacts = useSelector(getVisibleContacts);
  const contacts = useSelector(getContacts);

  return contacts.length ? (
    <ul className={s.contactsList}>
      {visibleContacts.map(contact => (
        <li key={contact.id}>
          <ContactItem contact={contact} />
        </li>
      ))}
    </ul>
  ) : (
    <h3 className={s.empty}>Сome on, add your first contact!</h3>
  );
};

export default Contacts;
