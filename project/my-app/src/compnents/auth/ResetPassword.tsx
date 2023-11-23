import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { RecoveryContext } from '../../pages/auth/RecoveryProvider';
import InputField from '../_basic/library/inputs/InputField';

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
  const { setPage, verifiedToken } = useContext(RecoveryContext);

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
        console.log('Password changed');
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-gray-50 w-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <div className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <InputField
                label="Password:"
                name="password"
                type="string"
                register={register}
                errors={errors}
              />
              <InputField
                label="Confirm Password:"
                name="confirmPassword"
                type="string"
                register={register}
                errors={errors}
              />
              <button type="submit">Reset passwod</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
