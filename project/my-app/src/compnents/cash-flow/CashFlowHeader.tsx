import { BiCoinStack } from 'react-icons/bi';
import { IoStatsChart } from 'react-icons/io5';

import { formatDecimals } from '../_basic/helpers/utils';
import {
  expenseCalculation,
  goalsCalculation,
  incomeCalculation,
} from '../_basic/helpers/utils';
import { cashflowHeaderProps } from './types';

const CashFlowHeader = ({ cashFlow, pocketMoney }: cashflowHeaderProps) => {
  const amounts = cashFlow.map((item) => item.amount);

  const expense = expenseCalculation(cashFlow);
  const income = incomeCalculation(amounts);
  const goals = Math.abs(goalsCalculation(cashFlow));
  const totalIncome = income + (pocketMoney?.amount || 0);
  const total = formatDecimals(Number(totalIncome) - Number(expense + goals));

  return (
    <div className=" pt-2 flex px-5">
      <div className="flex flex-row space-x-10">
        <div className="flex flex-col bg-gray-100 p-4 w-72 h-30 rounded-md">
          <div>
            <p className="font-semibold	">Balance Left</p>
          </div>
          <div className="flex flex-row space-x-4 pt-2 text-[20px]">
            <div className="pt-1">
              <BiCoinStack style={{ color: '#3b757f' }} />
            </div>
            <p>{total}</p>
          </div>
        </div>
        <div className="flex flex-col bg-gray-100  p-4 w-72 h-30 rounded-md">
          <div>
            <p className="font-semibold	">Total Income</p>
          </div>
          <div className="flex flex-row space-x-4 pt-2 text-[20px]">
            <div className="pt-1">
              <IoStatsChart style={{ color: '#3b757f' }} />
            </div>
            <p>{totalIncome}</p>
          </div>
          <div>
            <p>Pocket money: {pocketMoney?.amount}</p>
            <p>Other income: {income}</p>
          </div>
        </div>
        <div className="flex flex-col bg-gray-100  p-4 w-72 h-30 rounded-md">
          <div>
            <p className="font-semibold	">Total Outcome</p>
          </div>
          <div className="flex flex-row space-x-4 pt-2 text-[20px]">
            <div className="pt-1">
              <IoStatsChart style={{ color: '#3b757f' }} />
            </div>
            <p>{expense + goals}</p>
          </div>
          <div>
            <p>Expense: {expense}</p>
            <p>Savings on Goals: {goals}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowHeader;
