import { Route, Routes } from 'react-router-dom';

import { RecoveryProvider } from '../../../../pages/auth/RecoveryProvider';
import SignIn from '../../../../pages/auth/SignIn';
import SignUp from '../../../../pages/auth/SignUp';

export const UnauthenticatedRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/auth/signUp" element={<SignUp />} />
        <Route path="/auth/signIn" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/reset-password" element={<RecoveryProvider />} />
      </Routes>
    </>
  );
};
