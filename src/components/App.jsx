import React from 'react';

import Layout from 'views/Layout';
import ContactsPage from 'views/ContactsPage';
import HomePage from 'views/HomePage';
import LoginPage from 'views/LoginPage';
import NotFoundPage from 'views/NotFoundPage';
import RegiserPage from 'views/RegiserPage';

import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUser } from 'redux/auth/auth-operations';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { getIsFetchingUser } from 'redux/auth/auth-selectors';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const isFetchingUser = useSelector(getIsFetchingUser);

  return isFetchingUser ? (
    <h1>Refreshing user...</h1>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="contacts"
            element={
              <PrivateRoute component={<ContactsPage />} redirectTo="/login" />
            }
          />
          <Route
            path="login"
            element={
              <PublicRoute component={<LoginPage />} redirectTo="/contacts" />
            }
          />
          <Route
            path="regiser"
            element={<PublicRoute component={<RegiserPage />} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};
