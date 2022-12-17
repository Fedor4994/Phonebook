import React from 'react';

import Layout from 'views/Layout/Layout';
import ContactsPage from 'views/ContactsPage/ContactsPage';
import HomePage from 'views/HomePage/HomePage';
import LoginPage from 'views/LoginPage/LoginPage';
import NotFoundPage from 'views/NotFoundPage';
import RegiserPage from 'views/RegisterPage/RegiserPage';

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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {!isFetchingUser && (
        <>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="contacts"
                element={
                  <PrivateRoute
                    component={<ContactsPage />}
                    redirectTo="/login"
                  />
                }
              />
              <Route
                path="login"
                element={
                  <PublicRoute
                    component={<LoginPage />}
                    redirectTo="/contacts"
                  />
                }
              />
              <Route
                path="register"
                element={<PublicRoute component={<RegiserPage />} />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </>
      )}
    </div>
  );
};
