import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import ItemsList from '../../../compnents/_basic/library/list/ItemsList';
import AddUser from '../../../compnents/users/AddUser';
import EditUser from '../../../compnents/users/EditUser';
import { UserData } from '../../../compnents/users/types';
import { UseAuth } from '../../../hooks/UseAuth';
import { useUsers } from '../../../hooks/UseQueries';

const Users = () => {
  UseAuth();
  const userId = window.localStorage.getItem('userID');

  const [search, setSearch] = useState<string>('');
  const [selectedUser, setSetSelectedUser] = useState<UserData | null>(null);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const { data: users } = useUsers();
  const queryClient = useQueryClient();

  const filteredUsers = users?.filter((user: UserData) => user.id !== userId);
  const searchedUsers = filteredUsers?.filter((user) => {
    return user.username.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    queryClient.invalidateQueries(['users']);
  }, [formOpen]);

  return (
    <div className="flex pt-14 space-x-5 ">
      <div className="flex flex-col">
        <ItemsList
          items={searchedUsers}
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
