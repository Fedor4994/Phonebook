import { Outlet } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';
import s from './Layout.module.css';
import { BsGithub } from 'react-icons/bs';

const Layout = () => {
  return (
    <>
      <div className={s.content}>
        <header className={s.header}>
          <Navigation />
        </header>
        <main className={s.main}>
          <Outlet />
        </main>
      </div>
      <footer className={s.footer}>
        Made by
        <a
          className={s.gitLink}
          target="_blank"
          href="https://github.com/Fedor4994"
          rel="noreferrer"
        >
          <BsGithub size={30} />
          Fedor Sosnin
        </a>
      </footer>
    </>
  );
};

export default Layout;
