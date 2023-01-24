import { useState } from 'react';
import s from './EditForm.module.css';
import {
  getEditedContact,
  getIsLoading,
} from 'redux/contacts/contacts-selectors';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from 'redux/contacts/contacts-operations';
import { useEffect } from 'react';
import { setEditedContact } from 'redux/contacts/contactsSlice';

const EditForm = () => {
  const editedContact = useSelector(getEditedContact);
  const [name, setName] = useState(editedContact.name);
  const [number, setNumber] = useState(editedContact.number);

  useEffect(() => {
    setName(editedContact.name);
    setNumber(editedContact.number);
  }, [editedContact.name, editedContact.number]);

  const dispatch = useDispatch();
  const onNameChange = event => setName(event.target.value);
  const onNumberChange = event => setNumber(event.target.value);
  const isLoading = useSelector(getIsLoading);

  const handleSubmit = event => {
    event.preventDefault();
    const id = editedContact.id;
    const newContact = { name, number, id };
    dispatch(updateContact(newContact));
    dispatch(setEditedContact(null));
  };

  return (
    <form onSubmit={handleSubmit} className={s.editForm}>
      <label className={s.editLabel}>
        <input
          className={s.editInput}
          onChange={onNameChange}
          placeholder="Name"
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={s.editLabel}>
        <input
          className={s.editInput}
          onChange={onNumberChange}
          placeholder="Phone number"
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <div className={s.editButtons}>
        <button disabled={isLoading} type="submit" className={s.submitButton}>
          Update contact
        </button>
        <button
          disabled={isLoading}
          type="button"
          onClick={() => dispatch(setEditedContact(null))}
          className={s.submitButton}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditForm;
