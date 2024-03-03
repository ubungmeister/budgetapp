import { Menu } from '@headlessui/react';
import { useCookies } from 'react-cookie';
import { IoMdContact } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import avatarNotFound from '../../../assets/images/avatar.png';
import { useUser } from '../../../hooks/UseQueries';
import { updateBudgets } from './../../../api/budget';

const HeaderMenu = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);

  const userRole = window.localStorage.getItem('userRole');
  const username = window.localStorage.getItem('username');
  const avatar = window.localStorage.getItem('avatar');

  const { data: userData } = useUser();

  const logout = () => {
    navigate('/auth/signin');
    setCookie('token', '');

    window.localStorage.removeItem('userID');
    window.localStorage.removeItem('userRole');
  };

  const menu = [
    { path: '/admin/overview', label: 'Overview', roles: ['ADMIN'] },
    { path: '/admin/budget', label: 'Budget', roles: ['ADMIN'] },
    { path: '/admin/pocket-money', label: 'Pocket Money', roles: ['ADMIN'] },
    { path: '/admin/users', label: 'Users', roles: ['ADMIN'] },
    { path: '/', label: 'Overview', roles: ['USER'] },
    { path: '/cash-flow', label: 'Cash Flow', roles: ['USER'] },
    {
      path: '/goals',
      label: 'Goals',
      roles: ['USER'],
    },
    { path: '/tasks', label: 'Tasks', roles: ['ADMIN', 'USER'] },
  ];

  return (
    <div className="z-50 text-right">
      <Menu
        as="div"
        className="relative inline-block text-left text-base-content "
      >
        <div>
          <Menu.Button className="inline-flex w-full justify-center py-2">
            <div className="w-14 h-14">
              <img
                className=" rounded-full "
                src={
                  userData?.avatar ||
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/560px-Default_pfp.svg.png'
                }
                alt="Avatar"
              />
            </div>
          </Menu.Button>
        </div>

        <Menu.Items className="absolute right-0 mt-4 w-60 origin-top-right divide-y divide-neutral rounded-md border border-neutral bg-gray-50 shadow-sm">
          <div className="flex flex-col space-y-1 text-gray-700 text-sm px-2 justify-center py-4 placeholder-opacity-80">
            <p>user: {username}</p>
            <p>role: {userRole}</p>
          </div>
          {menu
            .filter((item) => item.roles.includes(userRole || '')) // Filter items based on the user's role
            .map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <Link
                    to={item.path}
                    className={`${
                      active ? 'bg-[#80b7bd]' : ''
                    } flex w-full px-4 py-2 text-sm text-gray-700 md:hidden`}
                  >
                    {item.label}
                  </Link>
                )}
              </Menu.Item>
            ))}
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/settings"
                className={`${
                  active ? 'bg-[#80b7bd]' : ''
                }  flex w-full  px-4 py-4 text-sm text-gray-700`}
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          <div className="py-4 px-2">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? 'hover:bg-fuchsia-600  ' : ''
                  }   text-sm bg-fuchsia-500 text-white rounded-md justify-center flex w-full py-2`}
                >
                  Log Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};
export default HeaderMenu;
