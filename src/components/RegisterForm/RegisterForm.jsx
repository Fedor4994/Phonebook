import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

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
    <form onSubmit={handleSubmit} autoComplete="off">
      <label>
        Имя
        <input type="text" name="name" value={name} onChange={handleChange} />
      </label>

      <label>
        Почта
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </label>

      <label>
        Пароль
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterForm;
