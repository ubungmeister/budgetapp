import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UserData, initialUserData } from '../../compnents/helpers/types'
import UsersList from '../../compnents/users/UsersList'
import EditUser from '../../compnents/users/EditUser'
const Users = () => {
    const [users, setUsers] = useState<UserData[]>([initialUserData])
    const [search, setSearch] = useState<string>('')
    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([
        initialUserData,
    ])
    const [selectedUser, setSetSelectedUser] = useState<string>('')
    const [userForm, setUserForm] = useState<UserData>(initialUserData)
    const [formOpen, setFormOpen] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userID = window.localStorage.getItem('userID')
                const response = await axios.get(
                    'http://localhost:1000/auth/get-users',
                    {
                        params: {
                            userID: userID,
                        },
                    }
                )
                setUsers([...response.data.users])
            } catch (error) {
                console.log('Error fetching users:', error)
            }
        }

        fetchData()
    }, [formOpen])

    useEffect(() => {
        if (search === '') {
            setFilteredUsers(users) // Reset filtered users to original list
            return
        }
        const filteredUsers = users.filter((user) => {
            return user.username.toLowerCase().includes(search.toLowerCase())
        })

        setFilteredUsers(filteredUsers)
    }, [search, users])

    useEffect(() => {
        if (selectedUser) {
            const user = users.find((user) => user.id === selectedUser)
            if (user) {
                setUserForm(user)
            }
        }
    }, [selectedUser])

    return (
        <div className="p-10 ">
            <UsersList
                setSearch={setSearch}
                filteredUsers={filteredUsers}
                setSetSelectedUser={setSetSelectedUser}
                setFormOpen={setFormOpen}
                setUserForm={setUserForm}
            />
            <EditUser
                userForm={userForm}
                formOpen={formOpen}
                setFormOpen={setFormOpen}
                setUserForm={setUserForm}
            />
        </div>
    )
}

export default Users
