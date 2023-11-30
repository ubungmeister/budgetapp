import CancelButton from '../buttons/CancelButton';
import SaveButton from '../buttons/SaveButton';
import Notification from '../notification/Notification';

type EditUserControlsProps = {
  form: any;
  errorNotification?: string;
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
  submitForm: () => void;
};

const EditFormControls = ({
  form,
  errorNotification,
  setFormOpen,
  submitForm,
}: EditUserControlsProps) => {
  return (
    <div className=" bg-gray-50 pt-6 pb-4 px-4 justify-center ">
      {form.id ? (
        <div className=" flex  justify-between ">
          <div className="pt-2 text-[18px]">
            <span className="text-info-content">Edit:</span>
            <span className="text-info-content font-semibold pl-1 ">
              {form.username || form.name}
            </span>
          </div>

          <div>
            {errorNotification && (
              <Notification notification={errorNotification} />
            )}
          </div>
          <div className="flex space-x-5">
            <SaveButton handleSave={submitForm} buttonName={'Edit'} />
            <CancelButton setFormOpen={setFormOpen} />
          </div>
        </div>
      ) : (
        <div className="flex  justify-between ">
          <div className="pt-2 text-[18px]">
            <span className="text-info-content">Create:</span>
            <span className="text-info-content font-semibold pl-1 ">
              {form.username ? 'Add new user' : 'Add new Goal'}
            </span>
          </div>
          <div>
            {errorNotification && (
              <Notification notification={errorNotification} />
            )}
          </div>
          <div className="flex space-x-5">
            <SaveButton handleSave={submitForm} buttonName={'Save'} />
            <CancelButton setFormOpen={setFormOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EditFormControls;
