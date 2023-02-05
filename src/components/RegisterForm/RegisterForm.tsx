import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { register } from 'redux/auth/auth-operations';
import s from './RegisterForm.module.css';
import { useAppDispatch } from 'redux/store';
import { User } from 'types/auth';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const lettersOnly = (value: string | undefined) =>
  value
    ? /^[a-zA-Zа-яА-Я]+(([ -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(value)
    : false;

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
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is a required field'),
});

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const notify = () => toast.error('A user with the same email already exists');

  const handleSubmit = (
    { name, email, password }: Pick<User, 'name' | 'email' | 'password'>,
    {
      resetForm,
    }: {
      resetForm: Function;
    }
  ) => {
    dispatch(register({ name, email, password })).then(data => {
      if (data.meta.requestStatus === 'rejected') {
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
