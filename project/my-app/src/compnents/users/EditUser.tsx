import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { z } from 'zod';

import EditFormControls from '../_basic/helpers/EditFormControls';
import DeleteButton from '../_basic/library/buttons/DeleteButton';
import InputField from '../_basic/library/inputs/InputField';
import { createUser, deleteUser, updateUser } from './api';
import { Role } from './types';
import { EditUserProps } from './types';

const FormSchema = z.object({
  username: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().trim().min(1, { message: 'Email is required' }),
});
type FormSchemaType = z.infer<typeof FormSchema>;

const EditUser = ({ userForm, formOpen, setFormOpen }: EditUserProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const [errorNotification, setErrorNotification] = useState<string>('');

  const formRef = useRef<HTMLFormElement | null>(null);

  const userID = window.localStorage.getItem('userID');

  useEffect(() => {
    //reset all inputs fields on User change
    reset({
      username: userForm?.username || '',
      email: userForm?.email || '',
    });
  }, [userForm, reset]);

  // const userValidation = async (userForm: UserData) => {
  //   if (!userForm.username.trim()) {
  //     setErrorNotification('Please enter a username');
  //     return false;
  //   }
  //   if (!userForm.email.trim() || !userForm.email.includes('@')) {
  //     setErrorNotification('Please enter a valid email');
  //     return false;
  //   }

  //   const allUsers = await getUsers();

  //   if (allUsers.some((user: UserData) => user.email === userForm.email)) {
  //     if (userForm.id) {
  //       const user = allUsers.find((user: UserData) => user.id === userForm.id);
  //       if (user && user.email === userForm.email) {
  //         return true;
  //       }
  //     }
  //     setErrorNotification('Email already exists');
  //     return false;
  //   }
  //   return true;
  // };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    console.log(data);
    try {
      const formData = {
        ...data,
        familtyID: userForm?.familtyID || '',
        id: userForm?.id || '',
        role: userForm?.role || Role.USER,
      };
      console.log(formData);
      if (formData.id) {
        await updateUser(formData);
      } else if (userID) {
        await createUser(formData, userID);
      }
      setFormOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!formOpen) {
    return null;
  }

  const onDelete = async (value: string) => {
    if (value) {
      const shouldDelete = window.confirm(
        'Are you sure you want to delete this user?'
      );

      if (shouldDelete) {
        await deleteUser(value);
      }
    }
    setFormOpen(false);
  };

  const submitForm = () => {
    console.log('submitForm');
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
    <div className=" shadow-md rounded-md  max-w-[650px] min-w-[650px]">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="divide-solid divide-y">
          <EditFormControls
            form={userForm}
            errorNotification={errorNotification}
            setFormOpen={setFormOpen}
            submitForm={submitForm}
          />
          <div className="px-4 py-10 space-y-2 ">
            <InputField
              label="User name:"
              name="username"
              type="string"
              register={register}
              errors={errors}
            />
            <InputField
              label="Email:"
              name="email"
              type="string"
              register={register}
              errors={errors}
            />
            {userForm?.id && (
              <DeleteButton
                onDelete={onDelete}
                selectedItem={userForm}
                buttonName={'Delete User'}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
