import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/auth-operations';
import s from './LoginForm.module.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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
    dispatch(logIn({ email, password }));
    setEmail('');
    setPassword('');
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
        />
      </label>

      <button className={s.loginButton} type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
