import { createContext, useState } from 'react';

import EmailInput from '../../compnents/auth/EmailInput';
import OTPInput from '../../compnents/auth/OTPInput';
import RecoveredPassword from '../../compnents/auth/RecoveredPassword';
import ResetPassword from '../../compnents/auth/ResetPassword';

export const RecoveryContext = createContext({
  page: '',
  setPage: (value: string) => {},
  otp: 0,
  setOTP: (value: number) => {},
  setEmail: (value: string) => {},
  email: '',
});

// export const RecoveryContext = createContext();

export const RecoveryProvider = () => {
  const [page, setPage] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState<number>(0);

  console.log('otp', otp);

  function NavigateComponents() {
    if (page === 'email') return <EmailInput />;
    if (page === 'otp') return <OTPInput />;
    if (page === 'reset') return <ResetPassword />;

    return <RecoveredPassword />;
  }

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <div className="flex justify-center items-center bg-cover min-h-screen">
        <NavigateComponents />
      </div>
    </RecoveryContext.Provider>
  );
};
