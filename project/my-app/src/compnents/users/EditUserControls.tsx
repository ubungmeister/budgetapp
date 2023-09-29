import { BsSave } from 'react-icons/bs';
import { TfiBackLeft } from 'react-icons/tfi';

import CancelButton from '../../_basic/library/buttons/CancelButton';
import SaveButton from '../../_basic/library/buttons/SaveButton';
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
            <SaveButton handleSave={submitForm} />
            <CancelButton setFormOpen={setFormOpen} />
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
            <SaveButton handleSave={submitForm} />
            <CancelButton setFormOpen={setFormOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUserControls;
