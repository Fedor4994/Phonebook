import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';

export interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

const PrivateRoute = ({ component, redirectTo = '/' }: PrivateRouteProps) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
