import React from 'react'
import { UserData, initialUserData } from '../../compnents/helpers/types'

interface UsersListProps {
    filteredUsers: UserData[]
    setSearch: (search: string) => void
    setSetSelectedUser: (selectedUserForm: string) => void
    setFormOpen: (formOpen: boolean) => void
    setUserForm: (userForm: UserData) => void
}

const UsersList = ({
    filteredUsers,
    setSearch,
    setSetSelectedUser,
    setFormOpen,
    setUserForm,
}: UsersListProps) => {
    const selectedUserHandler = (user: UserData) => {
        setSetSelectedUser(user.id)
        setFormOpen(true)
    }
    const onAddUser = () => {
        setUserForm(initialUserData)
        setFormOpen(true)
    }
    return (
        <div>
            <p>Add, Delete, Edit Users</p>
            <div>
                <div>{filteredUsers.length} users found</div>
                <input
                    type="text"
                    placeholder="Search Users"
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                />
                <div>
                    {filteredUsers.map((user) => (
                        <div onClick={() => selectedUserHandler(user)}>
                            {user.username}
                        </div>
                    ))}
                </div>
                <button onClick={onAddUser}>Add User</button>
            </div>
        </div>
    )
}

export default UsersList
