import RegisterForm from 'components/RegisterForm/RegisterForm';
import s from './RegisterPage.module.css';

const RegiserPage = () => {
  return (
    <div className={s.registerPage}>
      <h2 className={s.register}>Register User</h2>
      <RegisterForm />
    </div>
  );
};

export default RegiserPage;
