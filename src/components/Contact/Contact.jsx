import s from './Contact.module.css';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getIsLoading } from 'redux/contacts/contacts-selectors';
import { setEditedContact } from 'redux/contacts/contactsSlice';
import { confirmAlert } from 'react-confirm-alert';
import { deleteContact } from 'redux/contacts/contacts-operations';

const Contact = ({ contact }) => {
  const { name, number } = contact;
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const contacts = useSelector(getContacts);

  const handleEdit = id => {
    const editedContact = contacts.find(contact => contact.id === id);
    dispatch(setEditedContact(editedContact));
  };

  const handleDelete = id => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <div className={s.modal}>
              <h1>Are you sure?</h1>
              <p className={s.confirmText}>You want to delete this contact?</p>
              <div className={s.buttons}>
                <button className={s.confirmButton} onClick={onClose}>
                  No
                </button>
                <button
                  className={s.confirmButton}
                  onClick={() => {
                    dispatch(deleteContact(id));
                    dispatch(setEditedContact(null));
                    onClose();
                  }}
                >
                  Delete it
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
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
          onClick={() => handleDelete(contact.id)}
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

export default Contact;
