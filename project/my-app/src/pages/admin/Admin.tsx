import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseAuth } from '../../hooks/UseAuth';

const AdminPage = () => {
  UseAuth();

  return <div>admin</div>;
};
export default AdminPage;
