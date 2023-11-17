import { AiOutlineUserAdd } from 'react-icons/ai';

import { AddUserProps, initialUserData } from './types';

const AddUser = ({ setSetSelectedUser, setFormOpen }: AddUserProps) => {
  const onAddUser = () => {
    setSetSelectedUser(initialUserData);
    setFormOpen(true);
  };

  return (
    <div className="px-10 pt-5">
      <button
        className="flex flex-row text-info-content font-semibold text-[16px] pt-4"
        onClick={onAddUser}
      >
        <AiOutlineUserAdd
          style={{ cursor: 'pointer', fontSize: '25px', paddingLeft: '2px' }}
        />
        <span className="pl-1">Add User</span>
      </button>
    </div>
  );
};

export default AddUser;
