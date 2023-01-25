import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';
import { PrivateRouteProps } from './PrivateRoute';

const PublicRoute = ({ component, redirectTo = '/' }: PrivateRouteProps) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};

export default PublicRoute;
