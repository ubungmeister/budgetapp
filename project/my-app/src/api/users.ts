import axios from 'axios';

import { UserData } from '../compnents/users/types';

export const updateUser = async (userForm: UserData) => {
  if (!userForm.username || !userForm.email) {
    return { message: 'Some data missing' };
  }
  try {
    const result = await axios.put(
      `http://38.180.48.116/users/edit-user/${userForm.id}`,
      {
        userForm,
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (userForm: UserData, userID: string) => {
  try {
    await axios.post(`http://38.180.48.116/users/create-user`, {
      userForm,
      userID,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (userID: string) => {
  try {
    await axios.delete(`http://38.180.48.116/users/delete-user/${userID}`);
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  const userID = window.localStorage.getItem('userID');
  const response = await axios.get(`http://38.180.48.116/users/get-users`, {
    params: {
      userID: userID,
    },
  });
  const users = response.data.users;
  return users;
};

export const getUser = async () => {
  const userID = window.localStorage.getItem('userID');
  const response = await axios.get(`http://38.180.48.116/users/get-user`, {
    params: {
      userID: userID,
    },
  });
  return response.data.user;
};
