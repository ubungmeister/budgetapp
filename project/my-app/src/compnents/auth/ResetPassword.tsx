import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { RecoveryContext } from '../../pages/auth/RecoveryProvider';
import AuthInputField from '../_basic/library/inputs/AuthInputField';

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type FormSchemaType = z.infer<typeof FormSchema>;

export default function ResetPassword() {
  const { verifiedToken } = useContext(RecoveryContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log('here');
    const formData = {
      newPassword: data.password,
      verifiedToken: verifiedToken,
    };
    try {
      const result = await axios.post(
        'http://localhost:1000/auth/reset-password',
        formData
      );
      if (result.status === 200) {
        toast.success('Password changed');
        navigate('/auth/signin');
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form className="auth" onSubmit={handleSubmit(onSubmit)}>
      <p className="my-5 text-center text-lg">Change Password</p>
      <div className="flex flex-col">
        <AuthInputField
          name="password"
          placeholder="Password:"
          register={register}
          errors={errors}
        />
        <AuthInputField
          placeholder="Confirm Password:"
          name="confirmPassword"
          register={register}
          errors={errors}
        />
        <button disabled={isSubmitting} className="auth-button type:submit">
          Reset passwod
        </button>
      </div>
    </form>
  );
}
