import React from 'react'
import { UserData } from '../../compnents/helpers/types'
import { updateUser, createUser, deleteUser, getUsers } from './api'

type EditUserProps = {
  userForm: UserData
  formOpen: boolean
  setUserForm: (userForm: UserData) => void
  setFormOpen: (formOpen: boolean) => void
}

const EditUser: React.FC<EditUserProps> = ({
  userForm,
  formOpen,
  setUserForm,
  setFormOpen,
}: EditUserProps) => {
  const userID = window.localStorage.getItem('userID')

  const userValidation = async (userForm: UserData) => {
    if (!userForm.username.trim()) {
      alert('Please enter a username')
      return false
    }
    if (!userForm.email.trim() || !userForm.email.includes('@')) {
      alert('Please enter a valid email')
      return false
    }

    const allUsers = await getUsers()

    if (allUsers.some((user: UserData) => user.email === userForm.email)) {
      if (userForm.id) {
        const user = allUsers.find((user: UserData) => user.id === userForm.id)
        if (user && user.email === userForm.email) {
          return true
        }
      }
      alert('Email already exists')
      return false
    }
    return true
  }

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isValid = await userValidation(userForm)
    if (userForm.id) {
      await updateUser(userForm)
    } else {
      if (userID) {
        await createUser(userForm, userID)
      }
    }
    if (isValid) {
      setFormOpen(false)
    }
  }

  if (!formOpen) {
    return null
  }

  const onDelete = async (userID: string) => {
    if (userID) {
      await deleteUser(userID)
    }
    setFormOpen(false)
  }

  return (
    <div>
      <form
        onSubmit={e => {
          formHandler(e)
        }}
      >
        <div>{userForm.id}</div>
        <input
          type="text"
          value={userForm.username}
          onChange={e => {
            setUserForm({ ...userForm, username: e.target.value })
          }}
        />
        <input
          type="text"
          value={userForm.email}
          onChange={e => {
            setUserForm({ ...userForm, email: e.target.value })
          }}
        />
        {userForm.id ? (
          <div>
            <button onClick={() => onDelete(userForm.id)}>Delete</button>
            <button type="submit">Edit</button>
            <button
              onClick={() => {
                setFormOpen(false)
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <button type="submit">Create</button>
            <button
              onClick={() => {
                setFormOpen(false)
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

export default EditUser
