import { BudgetData } from '../budget/types';
import { CashFlowProps } from '../cash-flow/types';
import { GoalProps } from '../goals/types';
import { PmType } from '../pocket-money/types';
import { TaskProps } from '../tasks/types';

export interface AdminHeaderProps {
  cashFlow: CashFlowProps[] | undefined;
  previousMonthCashFlow: CashFlowProps[] | undefined;
  goals: GoalProps[] | undefined;
  previousMonthGoals: GoalProps[] | undefined;
  tasks: TaskProps[] | undefined;
  budget: BudgetData[] | undefined;
  pocketMoney: number;
}
