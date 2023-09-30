import MonthButton from '../../_basic/library/buttons/MonthButton';
import MonthChangeButton from '../../_basic/library/buttons/MonthChangeButton';
import { OverviewControlsProps } from './types';

const OverviewControls = ({
  setIsMonthChange,
  pocketMoney,
}: OverviewControlsProps) => {
  return (
    <div className="flex flex-row justify-start">
      <MonthChangeButton setIsMonthChange={setIsMonthChange} />
      <MonthButton data={pocketMoney} />
    </div>
  );
};

export default OverviewControls;
