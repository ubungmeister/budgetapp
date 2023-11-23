import { FieldErrors, UseFormRegister } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  familyName: string;
};

type FieldProps = {
  name: keyof FormData;
  register: UseFormRegister<any>;
  errors: FieldErrors<FormData>;
  placeholder?: string;
};

const AuthInputField = ({
  name,
  register,
  errors,
  placeholder,
}: FieldProps) => {
  return (
    <div className="relative">
      <input
        className="auth-input"
        {...register(name)}
        placeholder={placeholder}
      />
      {errors && <p className="auth-error">{errors[name]?.message}</p>}
    </div>
  );
};
export default AuthInputField;
