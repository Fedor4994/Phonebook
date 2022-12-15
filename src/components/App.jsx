import React from 'react';

import Layout from 'views/Layout';
import ContactsPage from 'views/ContactsPage';
import HomePage from 'views/HomePage';
import LoginPage from 'views/LoginPage';
import NotFoundPage from 'views/NotFoundPage';

import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
