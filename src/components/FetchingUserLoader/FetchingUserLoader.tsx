import { RotatingLines } from 'react-loader-spinner';
import s from './FetchingUserLoader.module.css';

const FetchingUserLoader = () => {
  return (
    <div className={s.loaderBackground}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default FetchingUserLoader;
