import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

type FieldProps = {
  label: string;
  name: keyof FormData;
  register: UseFormRegister<any>;
  errors: FieldErrors<FormData>;
  type?: string;
  isDisabled?: boolean;
};

const AuthInputField = ({
  label,
  name,
  register,
  errors,
  type,
  isDisabled,
}: FieldProps) => {
  const commonProps = {
    id: name,
    className: 'input-table',
    ...(type === ('number' || 'float')
      ? register(name, { valueAsNumber: true })
      : register(name)),
  };
  return (
    <div className="flex flex-col text-[15px]">
      <p className="my-5 text-center text-lg">SignIn</p>
      <input type={type} {...commonProps} disabled={isDisabled || false} />
      {errors && <p className="auth-error">{errors[name]?.message}</p>}
    </div>
  );
};
export default AuthInputField;
