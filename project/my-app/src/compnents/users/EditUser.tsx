import React from 'react'
import { UserData } from '../../compnents/helpers/types'
import { updateUser, createUser, deleteUser } from './api'
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

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userForm.id) {
      await updateUser(userForm)
      setFormOpen(false)
    } else {
      if (userID) {
        await createUser(userForm, userID)
        setFormOpen(false)
      }
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
