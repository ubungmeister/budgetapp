import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { updateUser } from '../../api/settings';
import SaveButton from '../_basic/library/buttons/SaveButton';
import AvatarInputField from '../_basic/library/inputs/AvatarInputField';
import InputField from '../_basic/library/inputs/InputField';
import { SettingsProps } from './types';

const FormSchema = z.object({
  username: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().trim().min(1, { message: 'Description is required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const UserUpdateForm = ({ userData }: SettingsProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const [avatar, setAvatar] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null); // it is used to submit form on button click

  useEffect(() => {
    reset({
      username: userData?.username || '',
      email: userData?.email || '',
    });
    setAvatar(userData?.avatar || null);
  }, [userData]);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const formData = {
        ...data,
        avatar: avatar || null,
        id: userData?.id || '',
        token: window.localStorage.getItem('token') || '',
      };

      const result = await updateUser(formData);
      console.log('geeg', result);
      if (result && 'status' in result && result.status === 200) {
        toast.success('User updated successfully');
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle click on submit button
  const submitForm = () => {
    if (formRef.current) {
      const formElement = formRef.current;
      const submitEvent = new Event('submit', { cancelable: true });
      if (
        formElement.dispatchEvent(submitEvent) &&
        !submitEvent.defaultPrevented
      ) {
        handleSubmit(onSubmit);
      }
    }
  };

  return (
    <div className="flex flex-row space-x-5 px-10 ">
      <div>
        <p className="font-bold text-gray-600">Personal info</p>
        <p className="text-gray-600">Update your photo or personal details.</p>
      </div>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col rounded-md shadow pb-5 px-10">
          <div className="flex flex-row space-x-2 pt-10 pb-5">
            {' '}
            <InputField
              label="User name:"
              name="username"
              type="string"
              register={register}
              errors={errors}
              className="input-table"
            />
            <InputField
              label="Email:"
              name="email"
              type="string"
              register={register}
              errors={errors}
              className="input-table"
            />
          </div>
          <AvatarInputField
            name="avatar"
            avatar={avatar}
            setAvatar={setAvatar}
          />
          <div className="flex justify-end items-end w-full">
            <SaveButton handleSave={submitForm} buttonName={'Save'} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserUpdateForm;
