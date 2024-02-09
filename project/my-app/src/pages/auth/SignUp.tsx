import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import AuthInputField from '../../compnents/_basic/library/inputs/AuthInputField';
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
              `http://localhost:1000/users/get-user-email?email=${email}`
            );
            const status = response.status;
            if (status === 200) {
              return true;
            }
            return false;
          } catch (error) {
            return false; // Assuming an error means the email doesn't exist
          }
        },
        { message: 'Email already exists' }
      ),
    familyName: z
      .string()
      .min(3, { message: 'Family name must be at least 3 characters long' }),
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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const result = await axios.post(
        `http://localhost:1000/auth/signup`,
        data
      );
      if (result.status === 200) {
        toast.success('User created successfully');
        navigate('/auth/signIn');
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <form className="auth" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="my-5 text-center text-lg">SignUp form</p>
          <AuthInputField
            name="username"
            register={register}
            errors={errors}
            placeholder={'Name'}
          />
          <AuthInputField
            name="email"
            register={register}
            errors={errors}
            placeholder={'Email'}
          />
          <AuthInputField
            name="familyName"
            register={register}
            errors={errors}
            placeholder={'Family Name'}
          />
          <AuthInputField
            name="password"
            register={register}
            errors={errors}
            placeholder={'Password'}
          />
          <AuthInputField
            name="confirmPassword"
            register={register}
            errors={errors}
            placeholder={'Confirm password'}
          />
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
