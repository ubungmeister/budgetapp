import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token || cookies.token === 'undefined' || cookies.token === 'null') {
      navigate('/auth/signin');
    }
  }, [cookies.token, navigate]);
};

export default useAuth;