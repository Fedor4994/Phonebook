import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logIn } from 'redux/auth/auth-operations';
import s from './LoginForm.module.css';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const notify = () => toast.error('Incorrect email or password');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(logIn({ email, password })).then(data => {
      if (data.error) {
        notify();
        setPassword('');
        return;
      }
      setEmail('');
      setPassword('');
    });
  };

  return (
    <form className={s.loginForm} onSubmit={handleSubmit} autoComplete="off">
      <label>
        <input
          className={s.loginInput}
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        <input
          className={s.loginInput}
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
      </label>

      <button className={s.loginButton} type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
