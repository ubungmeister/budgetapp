import { MouseEventHandler, useContext } from 'react';
import { TbCoins } from 'react-icons/tb';
import { Link, useLocation } from 'react-router-dom';

import { LayoutContext } from '../LayoutProvider';
import HeaderMenu from './HeaderMenu';

const Header = () => {
  const { isSidebarExpanded } = useContext(LayoutContext);

  const username = window.localStorage.getItem('username');

  const location = useLocation();

  //prevent refresh on link click in admin mode
  const handleLinkClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    console.log(location.pathname);
    if (location.pathname === '/admin/overview') {
      event.preventDefault();
    }
  };

  return (
    <header className=" px-0 font-mono text-white bolder  flex h-10 w-full flex-row items-center justify-center md:justify-between bg-[#3a909c]  md:h-20 md:min-h-[5rem]">
      <Link
        to="/"
        className={`flex h-full ${
          isSidebarExpanded ? 'w-72' : 'w-20 '
        }  items-center justify-center bg-[#28828f] p-4 `}
        onClick={handleLinkClick}
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
        <div className="md:text-xl text-sm">{username}</div>
        <button className="text-5xl">
          <HeaderMenu />
        </button>
      </div>
    </header>
  );
};

export default Header;
