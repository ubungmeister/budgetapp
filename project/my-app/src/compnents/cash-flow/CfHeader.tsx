import { formatDecimals } from '../../_basic/helpers/utils';
import { expenseCalc, goalsCalc, incomeCalc } from '../../_basic/helpers/utils';
import { cashflowHeaderProps } from './types';

const CfHeader = ({ cashFlow, pocketMoney }: cashflowHeaderProps) => {
  const amounts = cashFlow.map((item) => item.amount);

  const expense = expenseCalc(cashFlow);
  const income = incomeCalc(amounts);
  const goals = Math.abs(goalsCalc(cashFlow));
  const totalIncome = income + (pocketMoney?.amount || 0);

  const total = formatDecimals(
    Number(totalIncome) - Number(-(expense + goals))
  );

  return (
    <div className=" pt-7 flex items-center justify-center">
      <div className="w-[25rem] h-44 border py-4 px-7">
        <div>
          <div className="flex justify-between">
            <div>Total income</div>
            <p>{totalIncome}</p>
          </div>
          <div className="pl-2 italic">
            <div className="flex justify-between">
              <p>Pocket money:</p>
              <p>{pocketMoney?.amount || 0}</p>
            </div>
            <div className="flex justify-between">
              <p>Other income::</p>
              <p>{income || 0}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div>Spendings</div>
          <p>{expense}</p>
        </div>
        <div className="flex justify-between">
          <div>Savings on goals</div>
          <p>{goals}</p>
        </div>
        <div className="flex justify-between">
          <div>Left</div>
          <p>{total}</p>
        </div>
      </div>
    </div>
  );
};

export default CfHeader;
