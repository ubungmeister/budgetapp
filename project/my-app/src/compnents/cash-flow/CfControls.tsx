import { BsSave } from 'react-icons/bs';

import MonthButton from '../../_basic/library/buttons/MonthButton';
import MonthChangeButton from '../../_basic/library/buttons/MonthChangeButton';
import { CashFlowControlsProps } from './types';

const CfControls = ({
  setIsMonthChange,
  pocketMoney,
  setFormOpen,
  setSelectedCashFlow,
}: CashFlowControlsProps) => {
  return (
    <div>
      <div className="flex flex-row justify-start">
        <MonthChangeButton setIsMonthChange={setIsMonthChange} />
        <MonthButton data={pocketMoney} />
        <button
          className="button-month flex flex-row space-x-2 button-month px-5 py-2"
          onClick={() => {
            setFormOpen(true);
            setSelectedCashFlow(null);
          }}
        >
          <div className="flex flex-row space-x-2">
            <div className="py-1">
              <BsSave />
            </div>
            <span>Add +</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CfControls;
