import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { RecoveryContext } from '../../pages/auth/RecoveryProvider';
import InputField from '../_basic/library/inputs/InputField';

const FormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export default function EmailInput() {
  const { setEmail, setPage, email } = useContext(RecoveryContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      await axios.post('http://localhost:1000/auth/request-otp', data);
      setPage('otp');
      setEmail(data.email);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <form className="auth " onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Password:"
        name="email"
        type="string"
        register={register}
        errors={errors}
      />
      {/* <div className="min-w-[22rem]">
     
        <p className="my-5 text-center text-lg">Enter your email</p>
        <input
          className="auth-input"
          placeholder="Your email"
          {...register('email')}
        />
        {errors.email && <p className="auth-error">{errors.email.message}</p>}
      </div> */}
      <div>
        <button
          disabled={!!errors.email}
          className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
        >
          Verify Email
        </button>
      </div>
    </form>
  );
}
