import wallet from '../../assets/images/wallet.png';
import {
  goalsCalculation,
  percentageBetweenTwoNumbers,
} from '../_basic/helpers/utils';
import OverviewBox from '../_basic/library/overview/OverviewBox';
import { AdminHeaderProps } from './types';

const AdminOverviewHeaders = ({
  cashFlow,
  previousMonthCashFlow,
  goals,
  previousMonthGoals,
}: AdminHeaderProps) => {
  const savedOnGoalsCurrentMonth = Math.abs(goalsCalculation(cashFlow || []));
  const savedOnGoalsLastMonth = goalsCalculation(previousMonthCashFlow || []);

  const percentageGoals = percentageBetweenTwoNumbers(
    savedOnGoalsCurrentMonth,
    savedOnGoalsLastMonth
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
          boxType={'Goals'}
        />
        {/* <OverviewBox
          amount={currentMonthExpense}
          percentage={percentageExpenses}
          img={minus}
          text={popUpTextExpense}
          boxType={'Expense'}
        />
        <OverviewBox
          amount={currentMonthIncome}
          percentage={percentageIncomes}
          img={plus}
          text={popUpTextIncome}
          boxType={'Income'}
        />
        <OverviewBox
          amount={tasksAmount}
          percentage={0}
          img={tasksImg}
          text={tasksText}
          boxType={'Solved task'}
        /> */}
      </div>
    </div>
  );
};

export default AdminOverviewHeaders;
