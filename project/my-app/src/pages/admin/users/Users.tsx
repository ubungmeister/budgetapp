import { useEffect, useState } from 'react';

import ItemsList from '../../../compnents/_basic/library/list/ItemsList';
import AddUser from '../../../compnents/users/AddUser';
import EditUser from '../../../compnents/users/EditUser';
import { getUsers } from '../../../compnents/users/api';
import { UserData, initialUserData } from '../../../compnents/users/types';
import { UseAuth } from '../../../hooks/UseAuth';

const Users = () => {
  UseAuth();
  const userId = window.localStorage.getItem('userID');

  const [users, setUsers] = useState<UserData[]>([initialUserData]);
  const [search, setSearch] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([
    initialUserData,
  ]);
  const [selectedUser, setSetSelectedUser] = useState<UserData | null>(null);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const allUsers = await getUsers();
        const filteredUsers = allUsers.filter(
          (user: UserData) => user.id !== userId
        );
        setUsers(filteredUsers);
      }
    };
    fetchData();
  }, [formOpen]);

  useEffect(() => {
    if (search === '') {
      setFilteredUsers(users); // Reset filtered users to original list
      return;
    }
    const filteredUsers = users.filter((user) => {
      return user.username.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredUsers(filteredUsers);
  }, [search, users]);

  return (
    <div className="flex pt-14 space-x-5 ">
      <div className="flex flex-col">
        <ItemsList
          items={filteredUsers}
          setSelectedItem={setSetSelectedUser}
          setFormOpen={setFormOpen}
          setSearch={setSearch}
          itemName={'Users'}
        />
        <AddUser
          setSetSelectedUser={setSetSelectedUser}
          setFormOpen={setFormOpen}
        />
      </div>
      <EditUser
        userForm={selectedUser}
        formOpen={formOpen}
        setFormOpen={setFormOpen}
      />
    </div>
  );
};

export default Users;
