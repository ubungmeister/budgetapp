import { createContext, useState } from 'react';

import EmailInput from '../../compnents/auth/EmailInput';
import OTPInput from '../../compnents/auth/OTPInput';
import ResetPassword from '../../compnents/auth/ResetPassword';
import SignIn from './SignIn';
import withAuthLayout from './layout';

export const RecoveryContext = createContext({
  page: '',
  setPage: (value: string) => {},
  verifiedToken: '',
  setVerifiedToken: (value: string) => {},
  setEmail: (value: string) => {},
  email: '',
});

// export const RecoveryContext = createContext();

const RecoveryProvider = () => {
  const [page, setPage] = useState('email');
  const [email, setEmail] = useState('');
  const [verifiedToken, setVerifiedToken] = useState('');

  function NavigateComponents() {
    if (page === 'email') return <EmailInput />;
    if (page === 'otp') return <OTPInput />;
    if (page === 'reset') return <ResetPassword />;

    return <SignIn />;
  }

  return (
    <RecoveryContext.Provider
      value={{
        page,
        setPage,
        verifiedToken,
        setVerifiedToken,
        setEmail,
        email,
      }}
    >
      <div className="flex justify-center items-center bg-cover min-h-screen">
        <NavigateComponents />
      </div>
    </RecoveryContext.Provider>
  );
};

export default withAuthLayout(RecoveryProvider);
