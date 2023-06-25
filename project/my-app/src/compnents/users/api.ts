import { UserData } from './types'
import axios from 'axios'

export const updateUser = async (userForm: UserData) => {
  if (!userForm.username || !userForm.email) {
    return { message: 'Some data missing' }
  }
  try {
    const result = await axios.put(
      `http://localhost:1000/users/edit-user/${userForm.id}`,
      {
        userForm,
      }
    )
    return result
  } catch (error) {
    console.log(error)
  }
}

export const createUser = async (userForm: UserData, userID: string) => {
  try {
    await axios.post(`http://localhost:1000/users/create-user`, {
      userForm,
      userID,
    })
  } catch (error) {
    console.log(error)
  }
}

export const deleteUser = async (userID: string) => {
  try {
    await axios.delete(`http://localhost:1000/users/delete-user/${userID}`)
  } catch (error) {
    console.log(error)
  }
}

export const getUsers = async () => {
  try {
    const userID = window.localStorage.getItem('userID')
    const response = await axios.get('http://localhost:1000/users/get-users', {
      params: {
        userID: userID,
      },
    })
    const users = response.data.users
    return users
  } catch (error) {
    console.log('Error fetching users:', error)
  }
}
