import React from 'react';
import { BsSave } from 'react-icons/bs';

type SaveButtonProps = {
  handleSave: () => void;
  saveDiasbled?: boolean;
};

const SaveButton = ({ handleSave, saveDiasbled }: SaveButtonProps) => {
  return (
    <div>
      <button
        className={`px-5 py-2.5 flex flex-row space-x-2 ${
          saveDiasbled ? 'button-disabled' : 'button-month'
        }`}
        onClick={() => handleSave()}
        disabled={saveDiasbled}
      >
        <div className="py-1">
          <BsSave />
        </div>
        <span>Save</span>
      </button>
    </div>
  );
};

export default SaveButton;
