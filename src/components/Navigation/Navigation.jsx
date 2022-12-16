import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';
import UserMenu from 'components/UserMenu/UserMenu';

const Navigation = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? s.activeNavLink : undefined
            }
            to="/"
          >
            Home
          </NavLink>
        </li>

        {isLoggedIn ? (
          <UserMenu />
        ) : (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? s.activeNavLink : undefined
                }
                to="/login"
              >
                login
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? s.activeNavLink : undefined
                }
                to="/regiser"
              >
                regiset
              </NavLink>
            </li>
          </>
        )}

        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? s.activeNavLink : undefined
            }
            to="/contacts"
          >
            Contacts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
