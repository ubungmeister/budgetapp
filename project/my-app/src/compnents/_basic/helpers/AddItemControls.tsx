import { GoalControlsProps } from '../../goals/types';
import { TaskStatus } from '../../tasks/types';
import SaveButton from '../library/buttons/SaveButton';

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

const initinalTask = {
  id: '',
  name: '',
  description: '',
  goalId: '',
  userId: '',
  amount: 0,
  start_date: new Date(),
  end_date: new Date(),
  status: TaskStatus.PENDING,
  feedback: '',
  isActive: true,
  isComplete: false,
};

const AddItemControls = ({
  isActive,
  setIsActive,
  setFormOpen,
  setSelectedGoal,
  setSelectedTask,
  isDisabled,
}: GoalControlsProps) => {
  const onCreateItem = () => {
    setFormOpen(true);
    if (setSelectedGoal) {
      setSelectedGoal(initinalGoal);
    }
    if (setSelectedTask) {
      setSelectedTask(initinalTask);
    }
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
      {isDisabled !== false && (
        <SaveButton handleSave={onCreateItem} buttonName={'Add +'} />
      )}
    </div>
  );
};

export default AddItemControls;
