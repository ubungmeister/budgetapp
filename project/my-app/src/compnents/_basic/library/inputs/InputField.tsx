import React from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

type FormData = {
  name: string;
  amount: number;
  description: string;
};

type InputFieldProps = {
  label: string;
  name: keyof FormData;
  register: UseFormRegister<any>;
  errors: FieldErrors<FormData>;
  type?: string;
};

const InputField = ({
  label,
  name,
  register,
  errors,
  type,
}: InputFieldProps) => {
  const isNumber = type === 'number' || 'float';
  console.log(isNumber);
  const commonProps = {
    id: name,
    className: 'input-table',
    ...(type === ('number' || 'float')
      ? register(name, { valueAsNumber: true })
      : register(name)),
  };
  console.log(label, errors.name, errors);

  return (
    <div className="flex flex-col text-[15px]">
      <p className="text-gray-600 pb-1">{label}</p>
      {type === 'textarea' ? (
        <textarea className="input-table" {...register(name)} />
      ) : (
        <input type={type} {...commonProps} />
      )}
      {errors && <p className="auth-error">{errors[name]?.message}</p>}
    </div>
  );
};

export default InputField;
