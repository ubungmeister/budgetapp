import tasksImg from '../../assets/images/clipboard.png';
import minus from '../../assets/images/minus.png';
import plus from '../../assets/images/plus.png';
import wallet from '../../assets/images/wallet.png';
import {
  expenseCalculation,
  goalsCalculation,
  incomeCalculation,
  percentageBetweenTwoNumbers,
} from '../_basic/helpers/utils';
import OverviewBox from '../_basic/library/overview/OverviewBox';
import { OverviewHeaderProps } from './types';

const OverviewHeaders = ({
  cashFlow,
  previousMonthCashFlow,
  pocketMoney,
  previousMonthPocketMoney,
  tasks,
}: OverviewHeaderProps) => {
  const currentMonthAmounts = cashFlow.map((item) => item.amount);
  const currentMonthExpense = Math.abs(expenseCalculation(cashFlow));

  const previousMonthAmounts = previousMonthCashFlow.map((item) => item.amount);
  const previousMonthExpense = Math.abs(
    expenseCalculation(previousMonthCashFlow)
  );

  const currentMonthIncome =
    incomeCalculation(currentMonthAmounts) + (pocketMoney?.amount || 0);
  const previousMonthIncome =
    incomeCalculation(previousMonthAmounts) +
    (previousMonthPocketMoney?.amount || 0);

  const currentMonthGoals = Math.abs(goalsCalculation(cashFlow));
  const previousMonthGoals = goalsCalculation(previousMonthCashFlow);

  const percentageGoals = percentageBetweenTwoNumbers(
    currentMonthGoals,
    previousMonthGoals
  );

  const percentageExpenses = percentageBetweenTwoNumbers(
    currentMonthExpense,
    previousMonthExpense
  );

  const percentageIncomes = percentageBetweenTwoNumbers(
    currentMonthIncome,
    previousMonthIncome
  );

  const tasksAmount = tasks?.length || 0;

  const popUpTextGoals = [
    'Great! You saved more tnan in previous month. Keep it up 😄',
    'Buddy, You saved less than in previuse month. No worry, you can do it better next month',
  ];
  const popUpTextExpense = [
    'Buddy, You spent more tnan in previous month.Try to look after your expenses more properly',
    'Great! You spend less than in previuse month. Keep it up 😄',
  ];

  const popUpTextIncome = [
    'Great! You earned more tnan in previous month. Keep it up 😄',
    'Buddy, You earned less than in previuse month. No worry, you can do it better next month',
  ];
  const tasksText = ['Well done!'];

  return (
    <div className=" pt-2 flex px-5">
      <div className="flex flex-row space-x-10">
        <OverviewBox
          amount={currentMonthGoals}
          percentage={percentageGoals}
          img={wallet}
          text={popUpTextGoals}
          boxType={'Goals'}
        />
        <OverviewBox
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
        />
      </div>
    </div>
  );
};

export default OverviewHeaders;
