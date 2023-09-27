export interface UserData {
  id: string
  email: string
  familtyID: string
  username: string
  role: string
}

export const initialUserData = {
  id: '',
  username: '',
  email: '',
  role: '',
  familtyID: '',
}

export type EditUserProps = {
  userForm: UserData
  formOpen: boolean
  setUserForm: (userForm: UserData) => void
  setFormOpen: (formOpen: boolean) => void
}

export type EditUserControlsProps = {
  userForm: UserData
  errorNotification: string
  setFormOpen: (formOpen: boolean) => void
  submitForm: () => void
}
