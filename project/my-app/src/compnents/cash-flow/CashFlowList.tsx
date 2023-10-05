import { HiArrowsUpDown } from 'react-icons/hi2';

import { deleteCashFlow, updateGoals } from './api';
import { optionsExpense, optionsIncome } from './options';
import { CashFlowListProps, CashFlowProps } from './types';

const CashFlowList = ({
  setFormOpen,
  cashFlow,
  setSelectedCashFlow,
  selectedCashFlow,
  setCashFlowDeleted,
}: CashFlowListProps) => {
  const sortedCashFlowByDate = cashFlow.sort(function (a, b) {
    const dateA = new Date(a.start_date);
    const dateB = new Date(b.start_date);

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      // Handle invalid dates
      return 0;
    }

    return dateB.getTime() - dateA.getTime();
  });

  const onProjectSelect = (item: CashFlowProps) => {
    setSelectedCashFlow(item);
    setFormOpen(true);
  };

  const onProjectDelete = async (item: CashFlowProps) => {
    if (item.category_type === 'Goals') {
      await updateGoals(item);
    }
    await deleteCashFlow(item.id as string);
    setCashFlowDeleted(true);
  };

  return (
    <div className="pl-5 ">
      <div className="bg-gray-50 w-[31.5rem] p-4">
        <div className="flex flex-row space-x-2">
          <div className="pt-1">
            <HiArrowsUpDown style={{ color: '#3b757f' }} />
          </div>
          <p className="font-semibold">Cash Flow</p>
        </div>
        <div className="flex flex-col">
          {sortedCashFlowByDate.map((item) => {
            const options = item.amount < 0 ? optionsExpense : optionsIncome;
            const selectedOption = options.find(
              (el) => el.value === item.category
            );
            return (
              <div key={item.id} className="flex flex-row space-x-5">
                {selectedOption && (
                  <img
                    className="w-10 h-10"
                    src={selectedOption.src}
                    alt={selectedOption.label}
                  />
                )}
                <div>{item.category}</div>
                <div>
                  {new Date(item.start_date).toLocaleDateString('en-DE')}
                </div>
                <div>{item.description}</div>
                <div>{item.amount}</div>
                <div onClick={() => onProjectDelete(item)}>Delete</div>
                <div onClick={() => onProjectSelect(item)}>Edit</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CashFlowList;
