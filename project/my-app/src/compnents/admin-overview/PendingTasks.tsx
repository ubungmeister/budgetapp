import { BiPencil } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { capitalizeFirstLetter } from '../../compnents/_basic/helpers/utils';
import { TaskProps } from '../tasks/types';

type Props = {
  tasksInProgress: TaskProps[] | undefined;
};

const PendingTasks = ({ tasksInProgress }: Props) => {
  const statusName = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'pending';
      case 'ON_REVIEW':
        return 'on review';
      case 'DECLINED':
        return 'declined';
      default:
        return 'pending';
    }
  };
  return (
    <div className="overview-performance relative">
      <p className="pt-1">Tasks in Progress</p>
      <ul className="divide-y ">
        {tasksInProgress?.slice(0, 5).map((task, index) => (
          <li key={task.id} className="flex flex-row py-4 justify-between ">
            <div>
              <p className=" w-40 overflow-hidden truncate text-sm pr-2 text-gray-600 ">
                {capitalizeFirstLetter(task.name) || 'No name'}
              </p>
            </div>
            <div
              className={`justify-center items-center px-2  rounded-md pt-0.5 ${
                task.status === 'ON_REVIEW'
                  ? 'bg-yellow-100'
                  : task.status === 'DECLINED'
                  ? 'bg-red-100'
                  : 'bg-white'
              }`}
            >
              <p className={`text-sm justify-center items-center `}>
                {statusName(task.status)}
              </p>
            </div>
            <Link
              to={`/tasks?taskId=${task.id}`}
              className="flex flex-row space-x-2 cursor-pointer justify-center items-center"
            >
              <p>Manage</p>
              <BiPencil
                style={{
                  color: '#54a3ab',
                  cursor: 'pointer',
                  fontSize: '20px',
                  paddingLeft: '2px',
                }}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <Link
          to="/tasks"
          className="absolute bottom-5 right-5 text-gray-500 semibold text-[18px] hover:text-gray-700"
        >
          <p>See all</p>
        </Link>
      </div>
    </div>
  );
};

export default PendingTasks;
