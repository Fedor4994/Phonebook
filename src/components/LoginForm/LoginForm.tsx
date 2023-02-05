import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { logIn } from 'redux/auth/auth-operations';
import s from './LoginForm.module.css';
import { User } from 'types/auth';
import { useAppDispatch } from 'redux/store';

const initialValues = {
  email: '',
  password: '',
};

const schema = yup.object().shape({
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

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const notify = () => toast.error('Incorrect email or password');

  const handleSubmit = (
    { email, password }: Pick<User, 'email' | 'password'>,
    {
      resetForm,
    }: {
      resetForm: Function;
    }
  ) => {
    dispatch(logIn({ email, password })).then(data => {
      if (data.meta.requestStatus === 'rejected') {
        notify();
        resetForm({
          values: {
            email,
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
      <Form className={s.loginForm} autoComplete="off">
        <label>
          <Field className={s.loginInput} placeholder="Email" name="email" />
          <ErrorMessage className={s.error} component="div" name="email" />
        </label>

        <label>
          <Field
            className={s.loginInput}
            placeholder="Password"
            type="password"
            name="password"
          />
          <ErrorMessage className={s.error} component="div" name="password" />
        </label>

        <button className={s.loginButton} type="submit">
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
