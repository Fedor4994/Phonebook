import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import s from './RegisterForm.module.css';
import { register } from 'redux/auth/auth-operations';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const notify = () => toast.error('A user with the same email already exists');

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(register({ name, email, password })).then(data => {
      if (data.error) {
        notify();
        setEmail('');
        return;
      }
      setName('');
      setEmail('');
      setPassword('');
    });
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
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
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
          minLength="15"
          title="Email must contain at least 15 symbols"
          required
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
          pattern="\w{9,20}"
          title="Допустимая длина пароля 9-20 символов"
          required
        />
      </label>

      <button className={s.registerButton} type="submit">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
