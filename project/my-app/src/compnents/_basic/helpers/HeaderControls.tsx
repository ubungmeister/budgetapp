import React from 'react';

import CancelButton from '../library/buttons/CancelButton';
import MonthChangeButton from '../library/buttons/MonthChangeButton';
import SaveButton from '../library/buttons/SaveButton';
import Notification from '../library/notification/Notification';
import NotificationSuccess from '../library/notification/NotificationSuccess';

export interface ControlsProps {
  handleSave: () => void;
  setChangeCancel: (value: React.SetStateAction<boolean>) => void;
  setIsMonthChange: React.Dispatch<React.SetStateAction<string>>;
  saveDiasbled: boolean;
  sussessAlert: boolean;
}

//Controls component, which is used in Budget.tsx and Pm.tsx

const HeaderControls = ({
  setIsMonthChange,
  handleSave,
  setChangeCancel,
  saveDiasbled,
  sussessAlert,
}: ControlsProps) => {
  return (
    <div>
      <div className="flex flex-row justify-start">
        <MonthChangeButton setIsMonthChange={setIsMonthChange} />
        <div className="flex space-x-3 px-10">
          <SaveButton saveDiasbled={saveDiasbled} handleSave={handleSave} />
          <CancelButton setChangeCancel={setChangeCancel} />
          {saveDiasbled && (
            <Notification notification={'Budget limit exceeded !'} />
          )}
          {sussessAlert && <NotificationSuccess />}
        </div>
      </div>
    </div>
  );
};

export default HeaderControls;
