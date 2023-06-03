import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { UserData, initialUserData } from '../helpers/types'

const Header = () => {
    const [cookies, setCookie] = useCookies(['token'])
    const navigate = useNavigate()

    const [userData, setUserData] = useState<UserData>(initialUserData)

    const logout = () => {
        setCookie('token', '')
        window.localStorage.removeItem('userID')
        window.localStorage.removeItem('userRole')
        navigate('/auth/signin')
    }
    const userRole = window.localStorage.getItem('userRole')
    useEffect(() => {
        const fetchUserData = async () => {
            const userID = window.localStorage.getItem('userID')
            try {
                const response = await axios.get(
                    `http://localhost:1000/auth/get-user`,
                    {
                        params: {
                            userID: userID,
                        },
                    }
                )
                setUserData(response.data.user)
            } catch (error) {
                console.log('Error fetching user data:', error)
            }
        }

        fetchUserData()
    }, [])

    return (
        <header className=" px-0 font-mono text-white bolder md:px-20 flex h-10 w-full flex-row items-center justify-center md:justify-between bg-gradient-to-r from-[#2ec5ae] to-[#c93ca3]  md:h-20 md:min-h-[5rem]">
            <Link to="/">
                <div className="md:text-3xl text-l hover:text-pink-500">
                    Funny😄Money
                </div>
            </Link>
            <div className="flex flex-row items-center justify-center space-x-5 md:space-x-10 md:px-10 px-5 ">
                <div className="border md:px-2 md:py-1 py-0.5 px-1 rounded-xl md:text-l text-sm border-pink-500	">
                    {userRole}
                </div>
                <div className="md:text-xl text-sm">{userData?.username}</div>
                <button
                    onClick={logout}
                    className="md:text-xl text-sm hover:text-pink-500"
                >
                    Logout
                </button>
            </div>
        </header>
    )
}

export default Header
