import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

type FormData = {
  name: string;
  amount: number;
  description: string;
  goalAmount: number;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type InputFieldProps = {
  label: string;
  name: keyof FormData;
  register: UseFormRegister<any>;
  errors: FieldErrors<FormData>;
  type?: string;
  isDisabled?: boolean;
};

const InputField = ({
  label,
  name,
  register,
  errors,
  type,
  isDisabled,
}: InputFieldProps) => {
  const commonProps = {
    id: name,
    className: 'input-table',
    ...(type === ('number' || 'float')
      ? register(name, { valueAsNumber: true })
      : register(name)),
  };
  return (
    <div className="flex flex-col text-[15px]">
      <p className="text-gray-600 pb-1">{label}</p>
      {type === 'textarea' ? (
        <textarea
          className="input-table"
          {...register(name)}
          disabled={isDisabled || false}
        />
      ) : (
        <input type={type} {...commonProps} disabled={isDisabled || false} />
      )}
      {errors && <p className="auth-error">{errors[name]?.message}</p>}
    </div>
  );
};

export default InputField;
