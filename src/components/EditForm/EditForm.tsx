import {
  useState,
  useEffect,
  ChangeEventHandler,
  FormEventHandler,
} from 'react';
import { useSelector } from 'react-redux';
import {
  getEditedContact,
  getIsLoading,
} from 'redux/contacts/contacts-selectors';
import { updateContact } from 'redux/contacts/contacts-operations';
import { setEditedContact } from 'redux/contacts/contactsSlice';
import s from './EditForm.module.css';
import { useAppDispatch } from 'redux/store';

const EditForm = () => {
  const dispatch = useAppDispatch();
  const editedContact = useSelector(getEditedContact);
  const isLoading = useSelector(getIsLoading);

  const [name, setName] = useState(editedContact?.name || '');
  const [number, setNumber] = useState(editedContact?.phone || '');
  const [email, setEmail] = useState(editedContact?.email || '');

  useEffect(() => {
    setName(editedContact?.name || '');
    setNumber(editedContact?.phone || '');
    setEmail(editedContact?.email || '');
  }, [editedContact?.name, editedContact?.phone, editedContact?.email]);

  const onNameChange: ChangeEventHandler<HTMLInputElement> = event =>
    setName(event.target.value);
  const onNumberChange: ChangeEventHandler<HTMLInputElement> = event =>
    setNumber(event.target.value);
  const onEmailChange: ChangeEventHandler<HTMLInputElement> = event =>
    setEmail(event.target.value);

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const id = editedContact?._id || '';
    const newContact = { name, phone: number, _id: id, email };
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
        />
      </label>

      <label className={s.editLabel}>
        <input
          className={s.editInput}
          onChange={onEmailChange}
          placeholder="Email"
          type="email"
          name="email"
          value={email}
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
