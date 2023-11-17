export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
export interface UserData {
  id: string;
  email: string;
  familtyID: string;
  username: string;
  role: Role;
}

export const initialUserData = {
  id: '',
  username: '',
  email: '',
  role: Role.USER,
  familtyID: '',
};

export type EditUserProps = {
  userForm: UserData | null;
  formOpen: boolean;
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
};

export type EditUserControlsProps = {
  userForm: UserData;
  errorNotification: string;
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
  submitForm: () => void;
};

export interface AddUserProps {
  setSetSelectedUser: (value: React.SetStateAction<UserData | null>) => void;
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
}
