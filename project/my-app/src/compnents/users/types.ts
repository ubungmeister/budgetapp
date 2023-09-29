export interface UserData {
  id: string;
  email: string;
  familtyID: string;
  username: string;
  role: string;
}

export const initialUserData = {
  id: '',
  username: '',
  email: '',
  role: '',
  familtyID: '',
};

export type EditUserProps = {
  userForm: UserData;
  formOpen: boolean;
  setUserForm: (userForm: UserData) => void;
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
};

export type EditUserControlsProps = {
  userForm: UserData;
  errorNotification: string;
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
  submitForm: () => void;
};
