import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { register } from 'redux/auth/auth-operations';
import s from './RegisterForm.module.css';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const lettersOnly = value =>
  /^[a-zA-Zа-яА-Я]+(([ -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(value);

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is a required field')
    .test(
      'Letters only',
      'Name may contain only letters, apostrophe, dash and spaces.',
      lettersOnly
    ),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('Email is a required field'),
  password: yup
    .string()
    .min(9, 'Password must be at least 9 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is a required field'),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const notify = () => toast.error('A user with the same email already exists');

  const handleSubmit = ({ name, email, password }, { resetForm }) => {
    dispatch(register({ name, email, password })).then(data => {
      if (data.error) {
        notify();
        resetForm({
          values: {
            name,
            email: '',
            password: '',
          },
        });
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form className={s.registerForm} autoComplete="off">
        <label>
          <Field
            className={s.registerInput}
            placeholder="Name"
            type="text"
            name="name"
          />
          <ErrorMessage className={s.error} component="div" name="name" />
        </label>

        <label>
          <Field
            className={s.registerInput}
            placeholder="Email"
            type="email"
            name="email"
          />
          <ErrorMessage className={s.error} component="div" name="email" />
        </label>

        <label>
          <Field
            className={s.registerInput}
            placeholder="Password"
            type="password"
            name="password"
          />
          <ErrorMessage className={s.error} component="div" name="password" />
        </label>

        <button className={s.registerButton} type="submit">
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;