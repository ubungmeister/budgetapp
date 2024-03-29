import { BsSave } from 'react-icons/bs';
import { VscRocket } from 'react-icons/vsc';
import { toast } from 'react-toastify';

import { TaskStatus } from './types';

type TaskReviewControlProps = {
  taskStatus: TaskStatus;
  setTaskStatus: (status: TaskStatus) => void;
};

const TaskReviewControl = ({
  taskStatus,
  setTaskStatus,
}: TaskReviewControlProps) => {
  const isPending = taskStatus === TaskStatus.ON_REVIEW;
  const handleStatusChnage = () => {
    setTaskStatus(TaskStatus.ON_REVIEW);
    toast.success('Task sended for review');
  };
  return (
    <div className=" bg-gray-50 pt-6 pb-4 px-8 flex justify-end ">
      <button
        className={`px-5 py-2.5 flex flex-row space-x-2 ${
          isPending ? 'button-disabled' : 'button-month'
        }`}
        onClick={handleStatusChnage}
        disabled={isPending}
      >
        <div className="py-1">{isPending ? <VscRocket /> : <BsSave />}</div>
        <span>{isPending ? 'On a review...' : 'Ready to review'}</span>
      </button>
    </div>
  );
};

export default TaskReviewControl;
