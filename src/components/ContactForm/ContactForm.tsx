import { useSelector } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getContacts, getIsLoading } from 'redux/contacts/contacts-selectors';
import { addContact } from 'redux/contacts/contacts-operations';
import s from './ContactForm.module.css';
import { useAppDispatch } from 'redux/store';
import { Contact } from 'types/contact';

const initialValues = {
  name: '',
  phone: '',
  email: '',
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  email: yup.string(),
});

const ContactForm = () => {
  const dispatch = useAppDispatch();
  const contacts = useSelector(getContacts);
  const isLoading = useSelector(getIsLoading);
  const notify = (name: string) =>
    toast.error(`${name} is already in contacts`);

  const onSubmit = (
    { name, phone, email }: Pick<Contact, 'name' | 'phone' | 'email'>,
    { resetForm }: { resetForm: () => void }
  ) => {
    const isRepeatedContact = contacts.find(contact => contact.name === name);
    if (isRepeatedContact) {
      notify(name);
    } else {
      dispatch(addContact({ name, phone, email }));
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
            name="phone"
          />
          <ErrorMessage className={s.error} component="div" name="phone" />
        </label>

        <label className={s.contactLabel}>
          <Field
            className={s.contactInput}
            placeholder="Email"
            type="email"
            name="email"
          />
          <ErrorMessage className={s.error} component="div" name="email" />
        </label>

        <button disabled={isLoading} type="submit" className={s.submitButton}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
