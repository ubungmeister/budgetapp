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

export const initinalBudgetData = {
  id: '',
  month: new Date(),
  familyID: '',
  amount: 0,
}
