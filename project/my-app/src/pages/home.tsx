import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export const Home = () => {
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const logout = () => {
        setCookie('token', '');
        window.localStorage.removeItem('userID');
        navigate('/auth/signin');
    }
    
  useEffect(() => {
        if (!cookies.token) {
            navigate('/auth/signin');
        }
    }, []);

    return(
        <div>
        <div>Home</div>
        {cookies.token &&  <button onClick={logout}>LogOut</button>}
        </div>)
}