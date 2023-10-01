import { AiOutlineUserDelete } from 'react-icons/ai';

import { UserData } from '../../../users/types';

type DeleteUserButtonProps = {
  onDelete: (value: string) => void;
  userForm: UserData;
};

const DeleteUserButton = ({ onDelete, userForm }: DeleteUserButtonProps) => {
  return (
    <div className="pt-4">
      <button
        className="flex flex-row space-x-2 button-delete px-4 py-2 bg-red-100"
        onClick={() => onDelete(userForm.id)}
      >
        <div className="py-1">
          <AiOutlineUserDelete />
        </div>
        <span>Delete user</span>
      </button>
    </div>
  );
};

export default DeleteUserButton;
