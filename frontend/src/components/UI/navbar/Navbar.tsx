import { NavLink, NavLinkProps, useNavigate } from 'react-router-dom';

import { logoutUser } from 'redux/slices/auth.slie';
import { AuthService } from 'services/AuthService';

interface ExactNavLinkProps extends NavLinkProps {
    to: string;
    children: React.ReactNode;
    activeClassName: string;
}
  
export const ExactNavLink = (props: ExactNavLinkProps) => {
    return (
      <NavLink to={props.to} className={({isActive}) => (
        isActive 
        ? `nav-link ${props.activeClassName}`
        : `nav-link`
       )}>
        {props.children}
      </NavLink>
    );
}

export const Navbar = () => {
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate('/login');
  };

  const onLogoutClick = async () => {
    logoutUser(navigate);
  }

  return (
      <nav className="bg-[#39A2AE] p-4 text-lg">
        <div className="flex justify-between mx-8">
          <ul className="flex space-x-4 text-white">
            <li>
              <ExactNavLink to="/" activeClassName='font-bold'>
                Home
              </ExactNavLink>
            </li>
            <li>
              <ExactNavLink to="/authors" activeClassName='font-bold'>
                Authors
              </ExactNavLink>
            </li>
            <li>
              <ExactNavLink to="/genres" activeClassName='font-bold'>
                Genres
              </ExactNavLink>
            </li>
          </ul>
          <div className='flex text-white'>
            {
              AuthService.isAuthenticated() ? 
              <button onClick={onLogoutClick}>
                Logout
              </button> :
              <button onClick={onLoginClick}>
                Log in
              </button>
            }
          </div>
        </div>
      </nav>
    );
}
