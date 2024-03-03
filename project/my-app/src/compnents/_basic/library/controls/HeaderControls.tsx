import React from 'react';

import CancelButton from '../buttons/CancelButton';
import MonthChangeButton from '../buttons/MonthChangeButton';
import SaveButton from '../buttons/SaveButton';
import Notification from '../notification/Notification';
import NotificationSuccess from '../notification/NotificationSuccess';

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
      <div className="flex flex-row justify-start pt-8 pl-6  mb-3">
        <MonthChangeButton setIsMonthChange={setIsMonthChange} />
        <div className="flex gap-2">
          <SaveButton
            saveDiasbled={saveDiasbled}
            handleSave={handleSave}
            buttonName={'Save'}
          />
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
