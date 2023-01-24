import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';
import UserMenu from 'components/UserMenu/UserMenu';
import s from './Navigation.module.css';

const Navigation = () => {
  const width = window.innerWidth;
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <nav className={s.navigation}>
      <Link className={s.logo} to="/">
        <RiContactsBook2Fill size={60} />
        {width > 1280 && <span className={s.logoText}>PHONEBOOK</span>}
      </Link>

      <ul className={s.navigationList}>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? s.activeNavLink : s.navLink
            }
            to="/"
          >
            Home
          </NavLink>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? s.activeNavLink : s.navLink
                }
                to="/contacts"
              >
                Contacts
              </NavLink>
            </li>
            <UserMenu />
          </>
        ) : (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? s.activeNavLink : s.navLink
                }
                to="/login"
              >
                Log-In
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? s.activeNavLink : s.navLink
                }
                to="/register"
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
