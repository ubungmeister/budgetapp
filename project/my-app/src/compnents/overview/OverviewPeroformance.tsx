import { Line } from 'rc-progress';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { GoalProps } from '../goals/types';
import { capitalizeFirstLetter } from './../_basic/helpers/utils';

type OverviewPeroformanceProps = {
  goals: GoalProps[];
};

const OverviewPeroformance = ({ goals }: OverviewPeroformanceProps) => {
  //  yellow < 30% blue > 30%, green > 70%,

  const performancePercentage = (goal: GoalProps) => {
    const percentage = (goal.currentAmount / goal.goalAmount) * 100;
    return percentage;
  };

  const tooltipId = `my-tooltip-${Math.random().toString(36).substring(7)}`;

  return (
    <div className="overview-performance">
      <p className="pt-1 pb-6">Goals Performance</p>
      <div className="">
        <ul className="divide-y ">
          {goals.map((goal, index) => (
            <li key={goal.id} className="flex flex-row py-4 ">
              <div className="flex flex-row">
                <p className=" w-32 overflow-hidden truncate text-sm pr-2 text-gray-600">
                  {capitalizeFirstLetter(goal.name) || 'No name'}
                </p>
                <div className="flex flex-row justify-between">
                  <div className="w-[170px]">
                    <Line
                      data-tooltip-id={goal.id}
                      className="cursor-pointer"
                      percent={performancePercentage(goal)}
                      strokeWidth={12}
                      trailWidth={12}
                      strokeColor={`${
                        performancePercentage(goal) > 70
                          ? '#ef4949'
                          : performancePercentage(goal) > 30
                          ? '#54a3ab'
                          : '#FFBB28'
                      }`}
                      strokeLinecap="round"
                    />
                  </div>
                  <p className="px-2 text-center text-gray-600">
                    {performancePercentage(goal)}%
                  </p>
                  <ReactTooltip id={goal.id} aria-haspopup="true">
                    <p>Left:{goal.goalAmount - goal.currentAmount}€</p>
                  </ReactTooltip>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OverviewPeroformance;
