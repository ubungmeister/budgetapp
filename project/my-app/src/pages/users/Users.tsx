import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import EditUser from '../../compnents/users/EditUser';
import UsersList from '../../compnents/users/UsersList';
import { getUsers } from '../../compnents/users/api';
import { UserData, initialUserData } from '../../compnents/users/types';
import useAuth from '../../hooks/UseAuth';

const Users = () => {
  const [users, setUsers] = useState<UserData[]>([initialUserData]);
  const [search, setSearch] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([
    initialUserData,
  ]);
  const [selectedUser, setSetSelectedUser] = useState<string>('');
  const [userForm, setUserForm] = useState<UserData>(initialUserData);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useAuth();
  const userId = window.localStorage.getItem('userID');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = window.localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      navigate('/');
    } else {
      setIsAdmin(true);
    }
  }, [navigate]);

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

  useEffect(() => {
    if (selectedUser) {
      const user = users.find((user) => user.id === selectedUser);
      if (user) {
        setUserForm(user);
      }
    }
  }, [selectedUser]);

  if (!isAdmin) {
    return null; // Render nothing if the user is not an admin
  }

  return (
    <div className="flex pt-14 space-x-5 ">
      <UsersList
        setSearch={setSearch}
        filteredUsers={filteredUsers}
        setSetSelectedUser={setSetSelectedUser}
        setFormOpen={setFormOpen}
        setUserForm={setUserForm}
      />
      <EditUser
        userForm={userForm}
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        setUserForm={setUserForm}
      />
    </div>
  );
};

export default Users;
