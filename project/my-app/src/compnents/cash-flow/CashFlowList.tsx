import { BiPencil } from 'react-icons/bi';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { TbQuestionMark } from 'react-icons/tb';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { optionsExpense, optionsIncome } from './options';
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

  const onProjectSelect = (item: CashFlowProps) => {
    setSelectedCashFlow(item);
    setFormOpen(true);
  };

  const disabledEditing = (item: CashFlowProps) => {
    const isDisabled =
      item.category_type !== 'Goals' &&
      item.category !== 'Refund' &&
      item.category !== 'Task';
    return isDisabled;
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
          {sortedCashFlowByDate.map((item) => {
            const options = item.amount < 0 ? optionsExpense : optionsIncome;
            const selectedOption = options.find(
              (el) => el.value === item.category
            );
            return (
              <div
                key={item.id}
                className="flex flex-row space-x-5 py-1 items-center"
              >
                <div className="flex flex-row space-x-4 min-w-[8rem]  items-center ">
                  <img
                    className="w-8 h-8"
                    src={
                      selectedOption?.src ||
                      'https://upload.wikimedia.org/wikipedia/commons/b/bd/Circle_Gainsboro.svg'
                    }
                    alt={selectedOption?.label || ''}
                  />
                  <div className="flex flex-col">
                    <span>{item.category}</span>

                    <span className="text-[10px] text-gray-800 ">
                      {item.category_type}
                    </span>
                  </div>
                </div>
                <div className="max-w-[9rem] overflow-hidden  truncate min-w-[9rem] ">
                  {item.description}
                </div>
                <div className="flex flex-col max-w-[7rem] min-w-[7rem] items-end text-[14px] justify-center">
                  <div
                    className={`${
                      item.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.amount > 0 ? `+${item.amount}` : item.amount}
                  </div>
                  <div>
                    {new Date().toLocaleString('en-us', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                {disabledEditing(item) && (
                  <div
                    className=" cursor-pointer hover:text-info-content"
                    onClick={() => onProjectSelect(item)}
                  >
                    <BiPencil />
                  </div>
                )}
                {(item.category_type === 'Goals' ||
                  item.category === 'Task') && (
                  <>
                    <div data-tooltip-id="my-tooltip-1">
                      <TbQuestionMark />
                    </div>
                    <ReactTooltip id="my-tooltip-1" aria-haspopup="true">
                      <div className="">
                        <p>You can't edit amount.</p>
                        <p>If you want to edit goal go to</p>
                        <p>the Goal page and delete it</p>
                        <p>Money will be refunded.</p>
                      </div>
                    </ReactTooltip>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CashFlowList;
