import { BsSave } from 'react-icons/bs';
import { TfiBackLeft } from 'react-icons/tfi';

import Notification from '../../_basic/library/notification/Notification';
import { EditUserControlsProps } from './types';

const EditUserControls = ({
  userForm,
  errorNotification,
  setFormOpen,
  submitForm,
}: EditUserControlsProps) => {
  return (
    <div className=" bg-gray-50 pt-6 pb-4 px-4 justify-center">
      {userForm.id ? (
        <div className=" flex  justify-between ">
          <div className="pt-2 text-[18px]">
            <span className="text-info-content">Edit:</span>
            <span className="text-info-content font-semibold pl-1 ">
              {userForm.username}
            </span>
          </div>

          <div>
            {errorNotification && (
              <Notification notification={errorNotification} />
            )}
          </div>
          <div className="flex space-x-5">
            <button
              className="flex flex-row space-x-2 button-month px-5 py-2"
              onClick={() => submitForm()}
            >
              <div className="py-1">
                <BsSave />
              </div>
              <span>Save</span>
            </button>
            <button
              className="flex flex-row space-x-2 button-empty px-4 py-2"
              onClick={() => {
                setFormOpen(false);
              }}
            >
              <div className="py-1">
                <TfiBackLeft />
              </div>
              <span>Cancel</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="flex  justify-between space-x-36">
          <div className="pt-2 text-[18px]">
            <span className="text-info-content">Create:</span>
            <span className="text-info-content font-semibold pl-1 ">
              Add new user
            </span>
          </div>
          <div className="flex space-x-5">
            <button
              className="flex flex-row space-x-2 button-month px-4 py-2"
              onClick={() => submitForm()}
            >
              <div className="py-1">
                <BsSave />
              </div>
              <span>Create</span>
            </button>
            <button
              className="flex flex-row space-x-2 button-empty px-4 py-2"
              onClick={() => {
                setFormOpen(false);
              }}
            >
              <div className="py-1">
                <TfiBackLeft />
              </div>
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserControls;
