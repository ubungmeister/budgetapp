import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import AuthInputField from '../../compnents/_basic/library/inputs/AuthInputField';
import UseRedirect from '../../hooks/UseRedirect';
import { RecoveryContext } from './RecoveryProvider';
import withAuthLayout from './layout';

const FormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

const SignIn = () => {
  UseRedirect();
  const { setPage } = useContext(RecoveryContext);

  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:1000/auth/signin',
        data
      );
      setCookie('token', response.data.token);
      window.localStorage.setItem('userID', response.data.userID);
      window.localStorage.setItem('userRole', response.data.userRole);
      window.localStorage.setItem('username', response.data.username);
      window.localStorage.setItem('token', response.data.token);
      window.localStorage.setItem('avatar', response.data.avatar);

      navigate('/');
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const onShowHandler = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <>
      <form className="auth" onSubmit={handleSubmit(onSubmit)}>
        <div className="min-w-[22rem]">
          <p className="my-5 text-center text-lg">SignIn</p>
          <AuthInputField name="email" register={register} errors={errors} />
          <div className="relative">
            <input
              type={`${isShowPassword ? 'text' : 'password'}`}
              className="auth-input"
              placeholder="Your password"
              {...register('password')}
            />
            <svg
              onClick={onShowHandler}
              className="absolute right-3 top-[45%] transform -translate-y-1/2 w-6 h-6 cursor-pointer"
            >
              {isShowPassword ? (
                <FiEye size={'20px'} />
              ) : (
                <FiEyeOff size={'20px'} />
              )}
            </svg>
          </div>

          <button className="auth-button type:submit" disabled={isSubmitting}>
            SingIn
          </button>

          <div className="flex flex-row justify-center">
            <p className="mr-2">Don't have an account?</p>
            <p className="text-green-700 hover:text-green-800 cursor-pointer">
              <Link to="/auth/signUp">SignUp</Link>
            </p>
          </div>
          <div className="flex flex-row justify-center">
            <p className="mr-2">Forgot your password?</p>
            <p
              className="text-green-700 hover:text-green-800 cursor-pointer"
              onClick={() => setPage('email')}
            >
              <Link to="/reset-password ">Reset</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default withAuthLayout(SignIn);
