import { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { IoMdContact } from 'react-icons/io';
import { TbCoins } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { LayoutContext } from '../LayoutProvider';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  const { isSidebarExpanded } = useContext(LayoutContext);
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    setCookie('token', '');
    window.localStorage.removeItem('userID');
    window.localStorage.removeItem('userRole');
    navigate('/auth/signin');
  };
  const userRole = window.localStorage.getItem('userRole');
  const username = window.localStorage.getItem('username');

  const menuOpen = () => {};

  return (
    <header className=" px-0 font-mono text-white bolder  flex h-10 w-full flex-row items-center justify-center md:justify-between bg-[#3a909c]  md:h-20 md:min-h-[5rem]">
      <Link
        to="/"
        className={`flex h-full ${
          isSidebarExpanded ? 'w-72' : 'w-20 '
        }  items-center justify-center bg-[#28828f] p-4 `}
      >
        {' '}
        {isSidebarExpanded ? (
          <div className="md:text-3xl text-l hover:text-pink-500 flex flex-row justify-center items-center space-x-2">
            <TbCoins />
            <p className="">Pocket Money</p>
          </div>
        ) : (
          <div className="md:text-3xl text-l hover:text-pink-500">
            <TbCoins />
          </div>
        )}
      </Link>
      <div className="flex flex-row items-center justify-center space-x-5 md:space-x-10 md:px-10 px-5 ">
        {/* <div className="border md:px-2 md:py-1 py-0.5 px-1 rounded-xl md:text-l text-sm border-pink-500	">
          {userRole}
        </div> */}
        <div className="md:text-xl text-sm">{username}</div>
        {/* <hr className="md:h-10 h-5 border border-white opacity-50" /> */}
        {/* <button
          onClick={logout}
          className="md:text-xl text-sm hover:text-pink-500"
        >
          Logout
        </button> */}

        <button className="text-5xl">
          <HeaderMenu />
        </button>
      </div>
    </header>
  );
};

export default Header;
