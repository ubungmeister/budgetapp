import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { RecoveryContext } from '../../pages/auth/RecoveryProvider';
import AuthInputField from './../_basic/library/inputs/AuthInputField';

const FormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
});

export type FormSchemaType = z.infer<typeof FormSchema>;

export default function EmailInput() {
  const { setEmail, setPage } = useContext(RecoveryContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      await axios.post(`http://localhost:1000/auth/request-otp`, data);
      setPage('otp');
      setEmail(data.email);
    } catch (error: any) {
      //even if user doesn't exist, we will send the same message to avoid user enumeration
      setPage('otp');
    }
  };

  return (
    <form className="auth " onSubmit={handleSubmit(onSubmit)}>
      <p className="my-5 text-center text-lg">Enter your email address</p>
      <AuthInputField name="email" register={register} errors={errors} />
      <button
        disabled={!!errors.email || isSubmitting}
        className="auth-button type:submit"
      >
        Verify Email
      </button>
    </form>
  );
}
