import result from '../../assets/images/checklist.png';
import minus from '../../assets/images/minus.png';
import plus from '../../assets/images/plus.png';
import {
  expenseCalculation,
  incomeCalculation,
  percentageBetweenTwoNumbers,
} from '../_basic/helpers/utils';
import OverviewBox from '../_basic/library/overview/OverviewBox';
import { OverviewHeaderProps } from './types';

const OverviewHeaders = ({
  cashFlow,
  previousMonthCashFlow,
  pocketMoney,
}: OverviewHeaderProps) => {
  const currentMonthAmounts = cashFlow.map((item) => item.amount);
  const currentMonthExpense = Math.abs(expenseCalculation(cashFlow));

  const previousMonthAmounts = previousMonthCashFlow.map((item) => item.amount);
  const previousMonthExpense = Math.abs(
    expenseCalculation(previousMonthCashFlow)
  );

  const percentageExpenses = percentageBetweenTwoNumbers(
    currentMonthExpense,
    previousMonthExpense
  );

  const currentMonthIncome = incomeCalculation(currentMonthAmounts);
  const previousMonthIncome = incomeCalculation(previousMonthAmounts);

  const percentageIncomes = percentageBetweenTwoNumbers(
    currentMonthIncome,
    previousMonthIncome
  );

  const popUpTextExpense = [
    'Buddy, You spent more tnan in previous month.Try to look after your expenses more properly',
    'Great! You spend less than in previuse month. Keep it up 😄',
  ];

  const popUpTextIncome = [
    'Great! You earned more tnan in previous month. Keep it up 😄',
    'Buddy, You earned less than in previuse month. No worry, you can do it better next month',
  ];

  return (
    <div className=" pt-2 flex px-5">
      <div className="flex flex-row space-x-10">
        <div className="overview-box">
          <div className="flex flex-row space-x-4 min-w-[8rem]  items-center justify-center ">
            <img
              className="w-12 h-12 cursor-pointer  p-1"
              src={
                result ||
                'https://upload.wikimedia.org/wikipedia/commons/b/bd/Circle_Gainsboro.svg'
              }
              alt={''}
            />
          </div>
          <div className="pl-8 pt-2">
            <p className="">Total Goals: </p>
            <p className=" ">Finished Goal this month:</p>
            <p className="">Progress: </p>
          </div>
        </div>
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

        <div className="overview-box">
          <div>
            <p className="font-semibold	">Total Outcome</p>
          </div>
          <div className="cash-flow-icon">
            <div className="pt-1">eee</div>
            <p>eee</p>
          </div>
          <div>
            <p>Expense: </p>
            <p>Savings on Goals: </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewHeaders;
