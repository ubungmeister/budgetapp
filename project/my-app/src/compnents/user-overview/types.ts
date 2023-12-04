import { CashFlowProps } from '../cash-flow/types';
import { PmType } from '../pocket-money/types';
import { TaskProps } from '../tasks/types';

export interface OverviewControlsProps {
  setIsMonthChange: React.Dispatch<React.SetStateAction<string>>;
  month: Date | null;
}

export interface OverviewGraphProps {
  cashFlow: CashFlowProps[];
  pocketMoney: number;
}

export interface OverviewHeaderProps {
  cashFlow: CashFlowProps[];
  previousMonthCashFlow: CashFlowProps[];
  pocketMoney: PmType | undefined;
  previousMonthPocketMoney: PmType | undefined;
  tasks: TaskProps[] | null;
}
