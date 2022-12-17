import React from 'react';

import Layout from 'views/Layout';
import ContactsPage from 'views/ContactsPage';
import HomePage from 'views/HomePage';
import LoginPage from 'views/LoginPage';
import NotFoundPage from 'views/NotFoundPage';
import RegiserPage from 'views/RegiserPage';

import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from 'redux/auth/auth-operations';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="regiser" element={<RegiserPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
