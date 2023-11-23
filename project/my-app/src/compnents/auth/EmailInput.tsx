import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import { RecoveryContext } from '../../pages/auth/RecoveryProvider';
import InputField from '../_basic/library/inputs/InputField';

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
      await axios.post('http://localhost:1000/auth/request-otp', data);
      setPage('otp');
      setEmail(data.email);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  return (
    <form className="auth p-10" onSubmit={handleSubmit(onSubmit)}>
      <div>Enter your email address.</div>
      <InputField
        label=""
        name="email"
        type="string"
        register={register}
        errors={errors}
      />
      <div className="py-5">
        <button
          disabled={!!errors.email || isSubmitting}
          className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
        >
          Verify Email
        </button>
      </div>
    </form>
  );
}
