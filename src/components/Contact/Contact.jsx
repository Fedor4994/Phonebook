import PropTypes from 'prop-types';
import s from './Contact.module.css';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { getContacts, getIsLoading } from 'redux/contacts/contacts-selectors';

const Contact = ({ onContactDelete, onContactEdit, contact }) => {
  const { name, number } = contact;
  const isLoading = useSelector(getIsLoading);
  const contacts = useSelector(getContacts);

  const handleEdit = id => {
    const editedContact = contacts.find(contact => contact.id === id);
    onContactEdit(editedContact);
  };

  return (
    <div className={s.contact}>
      <p className={s.contactName}>
        <HiOutlineUserCircle />
        {name}
      </p>
      <p className={s.contactNumber}>
        <FiPhone />
        {number}
      </p>
      <div className={s.contactButtons}>
        <button
          disabled={isLoading}
          onClick={() => onContactDelete(contact.id)}
          className={s.contactsButton}
        >
          Delete
        </button>
        <button
          disabled={isLoading}
          onClick={() => handleEdit(contact.id)}
          className={s.contactsButton}
        >
          Edit
        </button>
        <a className={s.callButton} href={`tel: ${number}`}>
          Call
        </a>
      </div>
    </div>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;
