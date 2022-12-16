import PropTypes from 'prop-types';
import s from './Contact.module.css';

import { useSelector } from 'react-redux';
import { getIsLoading } from 'redux/contacts/contacts-selectors';

const Contact = ({ onContactDelete, contact }) => {
  const { name, number } = contact;
  const isLoading = useSelector(getIsLoading);
  return (
    <div className={s.contact}>
      <p>{`${name}: ${number}`}</p>
      <button
        disabled={isLoading}
        onClick={() => onContactDelete(contact.id)}
        className={s.deleteButton}
      >
        Delete
      </button>
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
