import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { getIsFetchingUser } from 'redux/auth/auth-selectors';
import { getCurrentUser } from 'redux/auth/auth-operations';
import Layout from 'views/Layout/Layout';
import ContactsPage from 'views/ContactsPage/ContactsPage';
import HomePage from 'views/HomePage/HomePage';
import LoginPage from 'views/LoginPage/LoginPage';
import NotFoundPage from 'views/NotFoundPage/NotFoundPage';
import RegiserPage from 'views/RegisterPage/RegiserPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { useAppDispatch } from 'redux/store';
import FetchingUserLoader from './FetchingUserLoader/FetchingUserLoader';

export const App = () => {
  const dispatch = useAppDispatch();
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
      {isFetchingUser ? (
        <FetchingUserLoader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="contacts"
                element={
                  <PrivateRoute
                    component={<ContactsPage />}
                    redirectTo="/register"
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
};
