import { GoalProps } from '../../../goals/types';
import { capitalizeFirstLetter } from '../../helpers/utils';
import ProgressLine from '../progress-line/ProgressLine';

type OverviewPeroformanceProps = {
  goals: GoalProps[];
};

const OverviewPeroformance = ({ goals }: OverviewPeroformanceProps) => {
  return (
    <div className="overview-performance">
      <p className="pt-1 pb-6">Goals Performance</p>

      <ul className="divide-y ">
        {goals.map((goal, index) => (
          <li key={goal.id} className="flex flex-row py-4 ">
            <div className="flex flex-row">
              <p className=" w-40 overflow-hidden truncate text-sm pr-2 text-gray-600 ">
                {capitalizeFirstLetter(goal.name) || 'No name'}
              </p>
              <ProgressLine selectedGoal={goal} width={'170px'} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverviewPeroformance;
