import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const UseRedirect = () => {
    const [cookies] = useCookies(['token'])
    const navigate = useNavigate()

    useEffect(() => {
        if (cookies.token) {
            navigate('/')
        }
    }, [cookies.token, navigate])
}

export default UseRedirect
