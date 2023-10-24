import { BsSave } from 'react-icons/bs';

import MonthButton from '../_basic/library/buttons/MonthButton';
import MonthChangeButton from '../_basic/library/buttons/MonthChangeButton';
import SaveButton from '../_basic/library/buttons/SaveButton';
import { CashFlowControlsProps } from './types';

const CashFlowControls = ({
  setIsMonthChange,
  pocketMoney,
  setFormOpen,
  setSelectedCashFlow,
}: CashFlowControlsProps) => {
  const onCreateTransaction = () => {
    setFormOpen(true);
    setSelectedCashFlow(null);
  };
  return (
    <div>
      <div className="flex flex-row justify-start">
        <MonthChangeButton setIsMonthChange={setIsMonthChange} />
        <MonthButton data={pocketMoney} />
        <SaveButton
          handleSave={onCreateTransaction}
          buttonName={'Add Transaction'}
        />
      </div>
    </div>
  );
};

export default CashFlowControls;
