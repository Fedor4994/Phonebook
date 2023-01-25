import { useNavigate } from 'react-router-dom';
import s from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className={s.homePage}>
      <h1 className={s.welcome}>
        WELCOME TO THE <br /> PHONE BOOK
      </h1>
      <button onClick={() => navigate('/contacts')} className={s.homeButton}>
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
