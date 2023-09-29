import { useRef } from 'react';
import { useState } from 'react';

import DeleteUserButtonProps from '../../_basic/library/buttons/DeleteUserButton';
import EditUserControls from './EditUserControls';
import { createUser, deleteUser, getUsers, updateUser } from './api';
import { UserData } from './types';
import { EditUserProps } from './types';

const EditUser = ({
  userForm,
  formOpen,
  setUserForm,
  setFormOpen,
}: EditUserProps) => {
  const [errorNotification, setErrorNotification] = useState<string>('');

  const formRef = useRef<HTMLFormElement | null>(null);

  const userID = window.localStorage.getItem('userID');

  const userValidation = async (userForm: UserData) => {
    if (!userForm.username.trim()) {
      setErrorNotification('Please enter a username');
      return false;
    }
    if (!userForm.email.trim() || !userForm.email.includes('@')) {
      setErrorNotification('Please enter a valid email');
      return false;
    }

    const allUsers = await getUsers();

    if (allUsers.some((user: UserData) => user.email === userForm.email)) {
      if (userForm.id) {
        const user = allUsers.find((user: UserData) => user.id === userForm.id);
        if (user && user.email === userForm.email) {
          return true;
        }
      }
      setErrorNotification('Email already exists');
      return false;
    }
    return true;
  };

  const formHandler = async (e: any) => {
    e.preventDefault();

    const isValid = await userValidation(userForm);
    if (userForm.id) {
      await updateUser(userForm);
    } else {
      if (userID) {
        await createUser(userForm, userID);
      }
    }
    if (isValid) {
      setFormOpen(false);
      setErrorNotification('');
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
    if (formRef.current) {
      const formElement = formRef.current;
      const submitEvent = new Event('submit', { cancelable: true });

      if (
        formElement.dispatchEvent(submitEvent) &&
        !submitEvent.defaultPrevented
      ) {
        formHandler(submitEvent);
      }
    }
  };

  return (
    <div className=" shadow-md rounded-md  max-w-[650px] min-w-[650px]">
      <form
        ref={formRef}
        onSubmit={(e) => {
          formHandler(e);
        }}
      >
        <div className="divide-solid divide-y">
          <EditUserControls
            userForm={userForm}
            errorNotification={errorNotification}
            setFormOpen={setFormOpen}
            submitForm={submitForm}
          />
          <div className="px-4 py-10 space-y-2 ">
            <div className="flex flex-col text-[15px]">
              <p className="text-gray-600 pb-1">User name:</p>
              <input
                className="input-table"
                placeholder="Enter user name..."
                type="text"
                value={userForm.username}
                onChange={(e) => {
                  setUserForm({ ...userForm, username: e.target.value });
                }}
              />
            </div>
            <div className="flex flex-col text-[15px] ">
              <p className="text-gray-600 pb-1">Email:</p>
              <input
                type="text"
                className="input-table"
                placeholder="Enter user email..."
                value={userForm.email}
                onChange={(e) => {
                  setUserForm({ ...userForm, email: e.target.value });
                }}
              />
            </div>
            {userForm.id && (
              <DeleteUserButtonProps onDelete={onDelete} userForm={userForm} />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
