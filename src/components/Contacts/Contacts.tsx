import { useSelector } from 'react-redux';
import s from './Contacts.module.css';
import ContactItem from 'components/Contact/Contact';
import { getContacts } from 'redux/contacts/contacts-selectors';
import { Contact } from 'types/contact';

interface ContactsProps {
  visibleContats: Contact[];
}

const Contacts = (props: ContactsProps) => {
  const contacts = useSelector(getContacts);

  return contacts.length ? (
    <ul className={s.contactsList}>
      {props.visibleContats.map(contact => (
        <li key={contact._id}>
          <ContactItem contact={contact} />
        </li>
      ))}
    </ul>
  ) : (
    <h3 className={s.empty}>There are no contacts here</h3>
  );
};

export default Contacts;
