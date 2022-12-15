import React from 'react';
import PropTypes from 'prop-types';
import s from './Contact.module.css';
import { useDeleteContactMutation } from 'redux/contactsApi';
import { Puff } from 'react-loader-spinner';

const Contact = ({ contact }) => {
  const { name, number } = contact;
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  return (
    <div className={s.contact}>
      <p>{`${name}: ${number}`}</p>
      <button
        disabled={isLoading}
        onClick={() => deleteContact(contact.id)}
        className={s.deleteButton}
      >
        {isLoading && (
          <Puff
            height="12"
            width="12"
            radisu={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}
        {isLoading ? 'Deleting' : 'Delete'}
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
