import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const UseAuth = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = window.localStorage.getItem('userRole');
    if (
      !cookies.token ||
      cookies.token === 'undefined' ||
      cookies.token === 'null'
    ) {
      navigate('/auth/signin');
    } else if (userRole !== 'ADMIN') {
      navigate('/');
    }
  }, [cookies.token, navigate]);
};

export const UseAuthUser = () => {
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = window.localStorage.getItem('userRole');
    if (
      !cookies.token ||
      cookies.token === 'undefined' ||
      cookies.token === 'null'
    ) {
      navigate('/auth/signin');
    } else if (userRole !== 'USER') {
      navigate('/admin');
    }
  }, [cookies.token, navigate]);
};
