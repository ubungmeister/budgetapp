import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import UseRedirect from '../../hooks/UseRedirect';
import withAuthLayout from './layout';

const FormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long' }),
    email: z
      .string()
      .email({ message: 'Please enter a valid email' })
      .refine(
        async (email) => {
          try {
            const response = await axios.get(
              `http://localhost:1000/users/get-user-email/${email}`
            );
            const { emailExists } = response.data;
            return !emailExists; // Return true if email doesn't exist, false otherwise
          } catch (error) {
            return true; // Assuming an error means the email doesn't exist
          }
        },
        { message: 'Email already exists' }
      ),
    familyName: z.string(),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
type FormSchemaType = z.infer<typeof FormSchema>;

const SignUp = () => {
  UseRedirect();

  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      await axios.post('http://localhost:1000/auth/signup', data);
      alert('User created successfully');
      setError('');
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <form className="auth" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="my-5 text-center text-lg">SignUp form</p>
          <input
            className="auth-input"
            type="text"
            placeholder="Name"
            {...register('username')}
          />
          {errors.username && (
            <p className="auth-error">{errors.username.message}</p>
          )}
          <input
            className="auth-input"
            placeholder="Emial"
            {...register('email')}
          />
          <input
            className="auth-input"
            type="text"
            placeholder="Family Name"
            {...register('familyName')}
          />
          {errors.email && <p className="auth-error">{errors.email.message}</p>}
          <input
            className="auth-input"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password && (
            <p className="auth-error">{errors.password.message}</p>
          )}
          <input
            className="auth-input"
            placeholder="Confirm Password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="auth-error mb-5">{errors.confirmPassword.message}</p>
          )}
          {error && <p className="auth-error mb-5">{error}</p>}
          <button className="auth-button type:submit" disabled={isSubmitting}>
            SingUp
          </button>
          <div className="flex flex-row justify-center">
            <p className="mr-2">Already registered?</p>
            <p className="text-green-700 hover:text-green-800 cursor-pointer">
              <Link to="/auth/signIn">SignIn</Link>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default withAuthLayout(SignUp);
