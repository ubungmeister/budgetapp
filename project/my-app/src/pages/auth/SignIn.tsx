import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

import UseRedirect from '../../hooks/UseRedirect';
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
      navigate('/');
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <form className="auth" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="my-5 text-center text-lg">SignIn</p>
          <input
            className="auth-input"
            placeholder="Your email"
            {...register('email')}
          />
          {errors.email && <p className="auth-error">{errors.email.message}</p>}
          <input
            className="auth-input"
            placeholder="Your password"
            {...register('password')}
          />
          {errors.password && (
            <p className="auth-error mb-5">{errors.password.message}</p>
          )}
          <div className="auth-credentials"> Forget your credential?</div>

          <button className="auth-button type:submit" disabled={isSubmitting}>
            SingIn
          </button>

          <div className="flex flex-row justify-center">
            <p className="mr-2">Don't have an account?</p>
            <p className="text-green-700 hover:text-green-800 cursor-pointer">
              <Link to="/auth/signUp">SignUp</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default withAuthLayout(SignIn);