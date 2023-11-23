import { createContext, useState } from 'react';

import EmailInput from '../../compnents/auth/EmailInput';
import OTPInput from '../../compnents/auth/OTPInput';
import RecoveredPassword from '../../compnents/auth/RecoveredPassword';
import ResetPassword from '../../compnents/auth/ResetPassword';

export const RecoveryContext = createContext({
  page: '',
  setPage: (value: string) => {},
  verifiedToken: '',
  setVerifiedToken: (value: string) => {},
  setEmail: (value: string) => {},
  email: '',
});

// export const RecoveryContext = createContext();

export const RecoveryProvider = () => {
  const [page, setPage] = useState('email');
  const [email, setEmail] = useState('');
  const [verifiedToken, setVerifiedToken] = useState('');

  console.log(verifiedToken);

  function NavigateComponents() {
    if (page === 'email') return <EmailInput />;
    if (page === 'otp') return <OTPInput />;
    if (page === 'reset') return <ResetPassword />;

    return <RecoveredPassword />;
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
