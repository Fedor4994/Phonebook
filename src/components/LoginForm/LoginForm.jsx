import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { logIn } from 'redux/auth/auth-operations';
import s from './LoginForm.module.css';

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
    .min(9, 'Password must be at least 9 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is a required field'),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const notify = () => toast.error('Incorrect email or password');

  const handleSubmit = ({ email, password }, { resetForm }) => {
    dispatch(logIn({ email, password })).then(data => {
      if (data.error) {
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