import checkmark from '../../assets/images/checkmark.png';
import tasksImg from '../../assets/images/clipboard.png';
import wallet from '../../assets/images/wallet.png';
import {
  differenceBetweenTwoNumbers,
  goalsCalculation,
  percentageBetweenTwoNumbers,
} from '../_basic/helpers/utils';
import OverviewBox from '../_basic/library/overview/OverviewBox';
import { GoalStatus } from '../goals/types';
import { TaskStatus } from '../tasks/types';
import { AdminHeaderProps } from './types';

const AdminOverviewHeaders = ({
  cashFlow,
  previousMonthCashFlow,
  goals,
  previousMonthGoals,
  tasks,
}: AdminHeaderProps) => {
  const savedOnGoalsCurrentMonth = Math.abs(goalsCalculation(cashFlow || []));
  const savedOnGoalsPreviousMonth = goalsCalculation(
    previousMonthCashFlow || []
  );

  const percentageGoals = percentageBetweenTwoNumbers(
    savedOnGoalsCurrentMonth,
    savedOnGoalsPreviousMonth
  );

  const completedGoals = goals?.filter(
    (goal) => goal.status === GoalStatus.COMPLETED
  );
  const completedGoalsPreviousMonth = previousMonthGoals?.filter(
    (goal) => goal.status === GoalStatus.COMPLETED
  );
  const differenceGoals = differenceBetweenTwoNumbers(
    completedGoals?.length || 0,
    completedGoalsPreviousMonth?.length || 0
  );
  const completedTasks = tasks?.filter(
    (task) => task.status === TaskStatus.APPROVED
  );

  const popUpTextGoals = [
    'Great! Your team members saved on Goals more than previous month 😄',
    'Buddy, You saved less than in previuse month. No worry, you can do it better next month',
  ];

  return (
    <div className=" pt-2 flex px-5">
      <div className="flex flex-row space-x-10">
        <OverviewBox
          amount={savedOnGoalsCurrentMonth}
          percentage={percentageGoals}
          img={wallet}
          text={popUpTextGoals}
          boxType={'Saved on Goals'}
        />
        <OverviewBox
          amount={completedGoals?.length || 0}
          img={checkmark}
          text={['']}
          boxType={'Comleted Goals'}
          difference={differenceGoals}
        />
        <OverviewBox
          amount={completedTasks?.length || 0}
          img={tasksImg}
          text={['']}
          boxType={'Solved Tasks'}
        />
        {/* <OverviewBox
          amount={currentMonthIncome}
          percentage={percentageIncomes}
          img={plus}
          text={popUpTextIncome}
          boxType={'Income'}
        /> */}
      </div>
    </div>
  );
};

export default AdminOverviewHeaders;
