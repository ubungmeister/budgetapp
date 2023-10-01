import React from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';

import { UserData, initialUserData } from '../../compnents/users/types';
import SearchBox from '../_basic/library/search-box/SearchBox';

interface UsersListProps {
  filteredUsers: UserData[];
  setSearch: (search: string) => void;
  setSetSelectedUser: (selectedUserForm: string) => void;
  setFormOpen: (formOpen: boolean) => void;
  setUserForm: (userForm: UserData) => void;
}

const UsersList: React.FC<UsersListProps> = ({
  filteredUsers,
  setSearch,
  setSetSelectedUser,
  setFormOpen,
  setUserForm,
}) => {
  const selectedUserHandler = (user: UserData) => {
    setSetSelectedUser(user.id);
    setFormOpen(true);
  };
  const onAddUser = () => {
    setUserForm(initialUserData);
    setFormOpen(true);
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  return (
    <div className=" pl-10 flex ">
      <div className="">
        <p className="text-[16px] py-2">
          <span className="text-green-700	">{filteredUsers.length}</span> Users
          found
        </p>
        <SearchBox onSearch={handleSearch} />
        <div className="divide-solid divide-y">
          {filteredUsers.map((user, index) => (
            <div
              className={`w-350px max-h-450px overflow-hidden flex flex-row justify-between items-center p-3 hover:bg-indigo-50
                ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              key={user.id}
              onClick={() => selectedUserHandler(user)}
            >
              <p>{user.username}</p>
              <BiPencil
                style={{
                  color: '#54a3ab',
                  cursor: 'pointer',
                  fontSize: '20px',
                  paddingLeft: '2px',
                }}
              />
            </div>
          ))}
        </div>
        <button
          className="flex flex-row text-info-content font-semibold text-[16px] pt-4"
          onClick={onAddUser}
        >
          <AiOutlineUserAdd
            style={{ cursor: 'pointer', fontSize: '25px', paddingLeft: '2px' }}
          />
          <span className="pl-1">Add User</span>
        </button>
      </div>
    </div>
  );
};

export default UsersList;
