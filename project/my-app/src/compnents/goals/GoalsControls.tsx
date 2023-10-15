import React from 'react';

import SaveButton from '../_basic/library/buttons/SaveButton';
import { GoalControlsProps } from './types';

const initinalGoal = {
  id: '',
  name: '',
  description: '',
  goalAmount: 0,
  currentAmount: 0,
  userId: '',
  start_date: new Date(),
  end_date: new Date(),
  isActive: true,
};

const GoalsControls = ({
  isActive,
  setIsActive,
  setFormOpen,
  setSelectedGoal,
}: GoalControlsProps) => {
  const onCreateGoal = () => {
    setFormOpen(true);
    setSelectedGoal(initinalGoal);
  };
  return (
    <div className="flex flex-row justify-start pl-5">
      <button
        onClick={() => setIsActive(!isActive)}
        className={` text-center justify-center ${
          isActive ? 'button-month' : 'button-disabled'
        }  px-2 min-w-[10rem] max-w-[8rem] mr-5 py-2`}
      >
        <p>{isActive ? 'Currently Active' : 'All Goals'}</p>
      </button>
      <SaveButton handleSave={onCreateGoal} buttonName={'Add Goal'} />
    </div>
  );
};

export default GoalsControls;
