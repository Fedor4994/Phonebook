import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './RegisterForm.module.css';
import { register } from 'redux/auth/auth-operations';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  return (
    <form className={s.registerForm} onSubmit={handleSubmit} autoComplete="off">
      <label>
        <input
          className={s.registerInput}
          placeholder="Name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </label>

      <label>
        <input
          className={s.registerInput}
          placeholder="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </label>

      <label>
        <input
          className={s.registerInput}
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </label>

      <button className={s.registerButton} type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
