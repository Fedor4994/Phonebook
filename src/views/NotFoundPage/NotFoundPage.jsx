import s from './NotFoundPage.module.css';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={s.NotFoundPage}>
      <h1 className={s.notFoundTitle}>
        Ooops... <br /> something went wrong
      </h1>
      <button onClick={() => navigate('/')} className={s.goBackButton}>
        Go to homepage
      </button>
    </div>
  );
};

export default NotFoundPage;
