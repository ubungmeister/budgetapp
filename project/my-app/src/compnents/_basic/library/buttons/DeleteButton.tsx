import { AiOutlineUserDelete } from 'react-icons/ai';
import { TbTargetArrow } from 'react-icons/tb';

import { GoalProps } from '../../../goals/types';
import { UserData } from '../../../users/types';

type DeleteButtonProps = {
  onDelete: (value: string) => void;
  userForm?: UserData;
  selectedGoal?: GoalProps | null;
};

const DeleteButton = ({
  onDelete,
  userForm,
  selectedGoal,
}: DeleteButtonProps) => {
  return (
    <div className="pt-4">
      <button
        className="flex flex-row space-x-2 button-delete px-4 py-2 bg-red-100"
        onClick={() => onDelete(userForm?.id || selectedGoal?.id || '')}
      >
        <div className="py-1">
          {userForm ? <AiOutlineUserDelete /> : <TbTargetArrow />}
        </div>
        <span>{userForm ? 'Delete User' : 'Delete Goal'}</span>
      </button>
    </div>
  );
};

export default DeleteButton;
