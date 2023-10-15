import React from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';

import { UserData, initialUserData } from '../../compnents/users/types';
import ListItems from '../_basic/library/list-items/ListItems';
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
        <ListItems
          listOfItems={filteredUsers}
          selectedItemHandler={selectedUserHandler}
        />
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
