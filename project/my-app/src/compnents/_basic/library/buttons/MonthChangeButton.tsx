import React from 'react';
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs';

type MonthChangeButtonProps = {
  setIsMonthChange: React.Dispatch<React.SetStateAction<string>>;
};

const MonthChangeButton = ({ setIsMonthChange }: MonthChangeButtonProps) => {
  return (
    <div className="flex space-x-3 mx-5">
      <button onClick={() => setIsMonthChange('prev')}>
        <BsArrowLeftSquare className="icons-controls" />
      </button>
      <button onClick={() => setIsMonthChange('next')}>
        <BsArrowRightSquare className="icons-controls" />
      </button>
    </div>
  );
};

export default MonthChangeButton;
