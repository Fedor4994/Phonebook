import { Outlet } from 'react-router-dom';
import Navigation from 'components/Navigation/Navigation';

const Layout = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
};

export default Layout;
