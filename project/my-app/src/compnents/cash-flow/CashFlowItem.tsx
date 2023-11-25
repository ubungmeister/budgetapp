import { BiPencil } from 'react-icons/bi';
import { TbQuestionMark } from 'react-icons/tb';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import { optionsExpense, optionsIncome } from './options';
import { CashFlowProps } from './types';
import { disabledEditing, formattedDate } from './utils';

type CashFlowItemProps = {
  item: CashFlowProps;
  handleProjectSelect: (item: CashFlowProps) => void;
};

const CashFlowItem = ({ item, handleProjectSelect }: CashFlowItemProps) => {
  const options = item.amount < 0 ? optionsExpense : optionsIncome;
  const selectedOption = options.find((el) => el.value === item.category);

  return (
    <div key={item.id} className="flex flex-row space-x-5 py-1 items-center">
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
          className={`${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}
        >
          {item.amount > 0 ? `+${item.amount}` : item.amount}
        </div>
        <div>{item.start_date && formattedDate(item.start_date)}</div>
      </div>
      {disabledEditing(item) && (
        <div
          className=" cursor-pointer hover:text-info-content"
          onClick={() => handleProjectSelect(item)}
        >
          <BiPencil />
        </div>
      )}
      {(item.category_type === 'Goals' || item.category === 'Task') && (
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
};

export default CashFlowItem;
