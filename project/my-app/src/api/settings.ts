import axios from 'axios';

export type SettingsPropsData = {
  username: string;
  email: string;
  avatar: string | null;
  id: string;
  token: string;
};
export const updateUser = async (userForm: SettingsPropsData) => {
  if (!userForm.username || !userForm.email) {
    return { message: 'Some data missing' };
  }
  try {
    const result = await axios.put(
      `http://localhost:1000/users/update-user/${userForm.id}`,
      {
        userForm,
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
