import LoginForm from 'components/LoginForm/LoginForm';
import s from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={s.loginPage}>
      <h2 className={s.login}>Login</h2>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
