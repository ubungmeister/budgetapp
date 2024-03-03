import { capitalizeFirstLetter } from '../_basic/helpers/utils';
import { BudgetListProps } from './types';

const BudgetTable = ({
  monthsAndBudget,
  setMonthsAndBudget,
}: BudgetListProps) => {
  return (
    <div className="flex md:flex-row flex-col items-center justify-center md:justify-start md:items-start pt-7 w-full pl-2">
      <div className="budget-header">
        <p className="budget-table-month">Month</p>
        <p className="md:pt-6 pt-0 pl-2 md:pl-0">Budget</p>
      </div>
      <div className="flex md:flex-row flex-col">
        {monthsAndBudget.map((monthEntry, index) => {
          const month = new Date(monthEntry.month);
          const monthName = month.toLocaleString('default', {
            month: 'long',
          });
          return (
            <div key={index} className="budget-header">
              <div className="budget-table-month">
                {capitalizeFirstLetter(monthName)}
              </div>
              <div className="md:pt-6 pt-0 w-auto">
                <input
                  className="border border-info-content-light w-20 h-9 text-center"
                  onChange={(e) => {
                    const updatedArray = [...monthsAndBudget];
                    updatedArray[index].amount =
                      parseFloat(e.target.value) || 0;
                    setMonthsAndBudget(updatedArray);
                  }}
                  type="number"
                  value={monthEntry.amount}
                  min={0}
                  max={1000000}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetTable;
