import { useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { FiPhone } from 'react-icons/fi';
import { SiMaildotru } from 'react-icons/si';
import { getContacts, getIsLoading } from 'redux/contacts/contacts-selectors';
import { setEditedContact } from 'redux/contacts/contactsSlice';
import { deleteContact } from 'redux/contacts/contacts-operations';
import s from './Contact.module.css';
import { Contact } from 'types/contact';
import { useAppDispatch } from 'redux/store';

interface ContactProps {
  contact: Contact;
}

const ContactItem = ({ contact }: ContactProps) => {
  const { name, phone, email } = contact;
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getIsLoading);
  const contacts = useSelector(getContacts);

  const handleEdit = (id: string) => {
    const editedContact = contacts.find(contact => contact._id === id);
    dispatch(setEditedContact(editedContact));
  };

  const handleDelete = (id: string) => {
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
      {name && (
        <p className={s.contactName}>
          <HiOutlineUserCircle />
          {name}
        </p>
      )}

      {phone && (
        <p className={s.contactName}>
          <FiPhone />
          {phone}
        </p>
      )}

      {email && (
        <p className={s.contactName}>
          <SiMaildotru />
          {email}
        </p>
      )}

      <div className={s.contactButtons}>
        <button
          disabled={isLoading}
          onClick={() => handleDelete(contact._id)}
          className={s.contactsButton}
        >
          Delete
        </button>
        <button
          disabled={isLoading}
          onClick={() => handleEdit(contact._id)}
          className={s.contactsButton}
        >
          Edit
        </button>
        <a className={s.callButton} href={`tel: ${phone}`}>
          Call
        </a>
      </div>
    </div>
  );
};

export default ContactItem;
