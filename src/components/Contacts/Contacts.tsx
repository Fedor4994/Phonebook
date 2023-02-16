import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Contact } from 'types/contact';
import { getContacts } from 'redux/contacts/contacts-selectors';
import ContactItem from 'components/Contact/Contact';
import s from './Contacts.module.css';

interface ContactsProps {
  visibleContats: Contact[];
}

const Contacts = (props: ContactsProps) => {
  const contacts = useSelector(getContacts);

  return contacts.length ? (
    <motion.ul className={s.contactsList}>
      {props.visibleContats.map(contact => (
        <motion.li
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={contact._id}
        >
          <ContactItem contact={contact} />
        </motion.li>
      ))}
    </motion.ul>
  ) : (
    <h3 className={s.empty}>There are no contacts here yet</h3>
  );
};

export default Contacts;
