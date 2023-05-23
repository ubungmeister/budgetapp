import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
 

const Header = () => {
      const [cookies, setCookie] = useCookies(['token']);
      const navigate = useNavigate();

const logout = () => {
        setCookie('token', '');
        window.localStorage.removeItem('userID');
        window.localStorage.removeItem('userRole');
        navigate('/auth/signin');
    }

    return (
        <div>
            <div>header</div>
            <button onClick={logout}>LogOut</button>
        </div>
    );
};

export default Header;