import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../_basic/helpers/UseAuth';

const AdminPage = () => {
  useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = window.localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      navigate('/');
    } else {
      setIsAdmin(true);
    }
  }, [navigate]);

  if (!isAdmin) {
    return null; // Render nothing if the user is not an admin
  }

  return <div>admin</div>;
};
export default AdminPage;
