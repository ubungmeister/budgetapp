import { AiOutlineUserDelete } from 'react-icons/ai';
import { TbTargetArrow } from 'react-icons/tb';

type DeleteButtonProps = {
  onDelete: (value: string) => void;
  selectedItem: any | null;
  buttonName?: string;
};

const DeleteButton = ({
  onDelete,
  selectedItem,
  buttonName,
}: DeleteButtonProps) => {
  return (
    <div className="pt-4">
      <button
        className="flex flex-row space-x-2 button-delete px-4 py-2 bg-red-100"
        onClick={() => onDelete(selectedItem?.id || '')}
      >
        <div className="py-1">
          {selectedItem?.username ? <AiOutlineUserDelete /> : <TbTargetArrow />}
        </div>
        <span>{buttonName}</span>
      </button>
    </div>
  );
};

export default DeleteButton;
