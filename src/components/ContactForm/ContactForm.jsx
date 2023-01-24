import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContacts, getIsLoading } from 'redux/contacts/contacts-selectors';
import { addContact } from 'redux/contacts/contacts-operations';
import s from './ContactForm.module.css';

const initialValues = {
  name: '',
  number: '',
};

const lettersOnly = value =>
  /^[a-zA-Zа-яА-Я]+(([ -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(value);

const digitsOnly = value =>
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(
    value
  );

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .test('Letters only', 'Name may contain only letters.', lettersOnly),
  number: yup
    .string()
    .required('Phone number is a required field')
    .test('Digits only', 'Must be a valid phone number', digitsOnly),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const notify = name => toast.error(`${name} is already in contacts`);

  const onSubmit = ({ name, number }, { resetForm }) => {
    const isRepeatedContact = contacts.find(contact => contact.name === name);
    if (isRepeatedContact) {
      notify(name);
    } else {
      dispatch(addContact({ name, number }));
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <Form className={s.contactForm} autoComplete="off">
        <label className={s.contactLabel}>
          <Field
            className={s.contactInput}
            placeholder="Name"
            type="text"
            name="name"
          />
          <ErrorMessage className={s.error} component="div" name="name" />
        </label>

        <label className={s.contactLabel}>
          <Field
            className={s.contactInput}
            placeholder="Phone number"
            type="tel"
            name="number"
          />
          <ErrorMessage className={s.error} component="div" name="number" />
        </label>

        <button disabled={isLoading} type="submit" className={s.submitButton}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
