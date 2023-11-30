import MonthButton from '../_basic/library/buttons/MonthButton';
import MonthChangeButton from '../_basic/library/buttons/MonthChangeButton';
import { OverviewControlsProps } from './types';

const OverviewControls = ({
  setIsMonthChange,
  month,
}: OverviewControlsProps) => {
  return (
    <div className="flex flex-row justify-start ">
      <MonthChangeButton setIsMonthChange={setIsMonthChange} />
      <MonthButton month={month} />
    </div>
  );
};

export default OverviewControls;
