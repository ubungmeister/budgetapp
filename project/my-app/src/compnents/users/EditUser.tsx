import React from 'react'
import { UserData } from '../../compnents/helpers/types'
import axios from 'axios'

type EditUserProps = {
    userForm: UserData
    formOpen: boolean
    setUserForm: (userForm: UserData) => void
    setFormOpen: (formOpen: boolean) => void
}

const EditUser = ({
    userForm,
    formOpen,
    setUserForm,
    setFormOpen,
}: EditUserProps) => {
    const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.put(
                `http://localhost:1000/auth/edit-user/${userForm.id}`,
                {
                    userForm,
                }
            )
        } catch (error) {
            console.log(error)
        }
        setFormOpen(false)
    }

    if (!formOpen) {
        return null
    }

    return (
        <div>
            <form
                onSubmit={(e) => {
                    formHandler(e)
                }}
            >
                <div>{userForm.id}</div>
                <input
                    type="text"
                    value={userForm.username}
                    onChange={(e) => {
                        setUserForm({ ...userForm, username: e.target.value })
                    }}
                />
                <input
                    type="text"
                    value={userForm.email}
                    onChange={(e) => {
                        setUserForm({ ...userForm, email: e.target.value })
                    }}
                />
                {userForm.id ? (
                    <div>
                        <button onClick={() => {}}>Delete</button>
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
