import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './ContactForm.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getContacts, getIsLoading } from 'redux/contacts/contacts-selectors';
import { addContact } from 'redux/contacts/contacts-operations';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const notify = () => toast.error(`${name} is already in contacts`);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onNameChange = event => setName(event.target.value);
  const onNumberChange = event => setNumber(event.target.value);

  const onSubmit = event => {
    event.preventDefault();
    const isRepeatedContact = contacts.find(contact => contact.name === name);
    if (isRepeatedContact) {
      notify();
    } else {
      dispatch(addContact({ name, number }));
    }
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={onSubmit} className={s.contactForm}>
      <label className={s.contactLabel}>
        <input
          className={s.contactInput}
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

      <label className={s.contactLabel}>
        <input
          className={s.contactInput}
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

      <button disabled={isLoading} type="submit" className={s.submitButton}>
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
