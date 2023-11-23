import { UseFormRegister } from 'react-hook-form';

type FieldProps = {
  name: string;
  register: UseFormRegister<any>;
  error: string;
};

const RecoveryInputField = ({ register, name, error }: FieldProps) => {
  return (
    <div className="px-1">
      <div className="w-16 h-16">
        <input
          className={` ${
            error
              ? `border-red-400 focus:border-fuchsia-300`
              : `border-gray-200 focus:border-fuchsia-300`
          } otp-input`}
          type="text"
          maxLength={1}
          autoFocus
          {...register(name)}
        />
      </div>
    </div>
  );
};

export default RecoveryInputField;
