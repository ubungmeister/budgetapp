import { HiArrowsUpDown } from 'react-icons/hi2';

import CashFlowItem from './CashFlowItem';
import { CashFlowListProps, CashFlowProps } from './types';

const CashFlowList = ({
  setFormOpen,
  cashFlow,
  setSelectedCashFlow,
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

  const handleProjectSelect = (item: CashFlowProps) => {
    setSelectedCashFlow(item);
    setFormOpen(true);
  };

  return (
    <div className="pl-5 ">
      <div className="bg-gray-100 w-[31.5rem] p-4 rounded-md">
        <div className="flex flex-row space-x-2">
          <div className="pt-1 pb-5">
            <HiArrowsUpDown style={{ color: '#3b757f' }} />
          </div>
          <p className="font-semibold">Cash Flow</p>
        </div>
        <div className="flex flex-col divide-y">
          {sortedCashFlowByDate.map((item) => (
            <CashFlowItem
              key={item.id}
              item={item}
              handleProjectSelect={handleProjectSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CashFlowList;
