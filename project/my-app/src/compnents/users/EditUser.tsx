import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import EditFormControls from '../_basic/helpers/EditFormControls';
import DeleteButton from '../_basic/library/buttons/DeleteButton';
import InputField from '../_basic/library/inputs/InputField';
import { getUsers } from '../users/api';
import { createUser, deleteUser, updateUser } from './api';
import { Role } from './types';
import { EditUserProps, UserData } from './types';

const FormSchema = z.object({
  username: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
});
type FormSchemaType = z.infer<typeof FormSchema>;

const EditUser = ({ userForm, formOpen, setFormOpen }: EditUserProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
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
    setErrorNotification('');
  }, [userForm, reset]);

  useEffect(() => {
    setErrorNotification('');
  }, [isDirty]);

  const isEmailExist = async (userForm: UserData) => {
    const allUsers = await getUsers();

    if (allUsers.some((user: UserData) => user.email === userForm.email)) {
      if (userForm.id) {
        const user = allUsers.find((user: UserData) => user.id === userForm.id);
        if (user && user.email === userForm.email) {
          return false;
        }
      }

      setErrorNotification('Email already exists');

      return true;
    }
    return false;
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const formData = {
        ...data,
        familtyID: userForm?.familtyID || '',
        id: userForm?.id || '',
        role: userForm?.role || Role.USER,
      };
      // reset all inputs fields on submit to triger isDirty useEffect if userEmailValidation is true
      reset({
        username: data.username,
        email: data.email,
      });

      const userEmailValidation = await isEmailExist(formData);
      if (userEmailValidation) {
        return;
      }
      if (formData.id) {
        await updateUser(formData);
      } else if (userID) {
        await createUser(formData, userID);
      }
      toast.success('User updated');
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
    toast.success('User deleted');
    setFormOpen(false);
  };

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
