import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { RecoveryContext } from '../../pages/auth/RecoveryProvider';
import RecoveryInputField from '../_basic/library/inputs/RecoveryInputField';

const FormSchema = z.object({
  otp1: z.string(),
  otp2: z.string(),
  otp3: z.string(),
  otp4: z.string(),
  otp5: z.string(),
  otp6: z.string(),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export default function OTPInput() {
  const { email, setPage, setVerifiedToken } = useContext(RecoveryContext);

  const [error, setError] = useState('');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  console.log(minutes, seconds);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  useEffect(() => {
    setSeconds(59);
    setMinutes(1);
  }, []);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}${data.otp5}${data.otp6}`;
    const formData = {
      otp: otp,
      email: email,
    };
    try {
      const result = await axios.post(
        'http://localhost:1000/auth/verify-otp',
        formData
      );
      if (result.status === 200) {
        const verifiedToken = result.data.verifiedToken;
        setVerifiedToken(verifiedToken);
        setPage('reset');
      }
    } catch (error: any) {
      setError(error.response.data.message);
      reset();
    }
  };

  const resetOTPHandler = () => {
    setMinutes(1);
    setSeconds(59);
    handleSubmit(onSubmit);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center w-screen h-screen bg-gray-50"
    >
      <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-14 ">
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-center mx-auto w-full max-w-xs">
                <RecoveryInputField
                  name="otp1"
                  register={register}
                  error={error}
                />
                <RecoveryInputField
                  name="otp2"
                  register={register}
                  error={error}
                />
                <RecoveryInputField
                  name="otp3"
                  register={register}
                  error={error}
                />
                <RecoveryInputField
                  name="otp4"
                  register={register}
                  error={error}
                />
                <RecoveryInputField
                  name="otp5"
                  register={register}
                  error={error}
                />
                <RecoveryInputField
                  name="otp6"
                  register={register}
                  error={error}
                />
              </div>
              {error && (
                <p className="pt-2 text-center text-sm text-fuchsia-700">
                  {error}
                </p>
              )}
            </div>

            <div className="flex flex-col space-y-3">
              <div>
                <button
                  type="submit"
                  className="auth-button"
                  disabled={isSubmitting}
                >
                  Verify Account
                </button>
              </div>
              <div className="flex justify-between ">
                <div className="flex-row flex space-x-2">
                  <p className="pr-2"> Time remaining:</p>
                  {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </div>
                <button
                  disabled={minutes > 0 || seconds > 0}
                  onClick={resetOTPHandler}
                  className={`${
                    minutes > 0 && seconds > 0
                      ? 'text-gray-400 px-1 border-gray-400 cursor-not-allowed'
                      : 'text-green-700 hover:text-green-800 cursor-pointer px-1 '
                  }'}`}
                >
                  Resend OTP
                </button>
              </div>
              <div className="flex flex-row">
                <p className="mr-2">Go back to</p>
                <p className="text-green-700 hover:text-green-800 cursor-pointer">
                  <Link to="/auth/signIn">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
