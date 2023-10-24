import { Line } from 'rc-progress';
import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { GoalProps } from '../../../goals/types';
import { performancePercentage } from '../../helpers/utils';

type Props = {
  selectedGoal: GoalProps | null;
  width: string;
};

const ProgressLine = ({ selectedGoal, width }: Props) => {
  return (
    <div className="flex flex-row justify-between">
      <div style={{ width: width }}>
        <Line
          data-tooltip-id={selectedGoal?.id}
          className="cursor-pointer"
          percent={performancePercentage(selectedGoal)}
          strokeWidth={12}
          trailWidth={12}
          strokeColor={`${
            performancePercentage(selectedGoal) > 70
              ? '#ef4949'
              : performancePercentage(selectedGoal) > 30
              ? '#54a3ab'
              : '#FFBB28'
          }`}
        />
        <ReactTooltip id={selectedGoal?.id} aria-haspopup="true">
          <p>
            Left:
            {(selectedGoal?.goalAmount || 0) -
              (selectedGoal?.currentAmount || 0)}
            €
          </p>
        </ReactTooltip>
      </div>
    </div>
  );
};

export default ProgressLine;
