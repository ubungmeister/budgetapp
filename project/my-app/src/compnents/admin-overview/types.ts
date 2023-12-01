import { CashFlowProps } from '../cash-flow/types';
import { GoalProps } from '../goals/types';
import { TaskProps } from '../tasks/types';

export interface AdminHeaderProps {
  cashFlow: CashFlowProps[] | undefined;
  previousMonthCashFlow: CashFlowProps[] | undefined;
  goals: GoalProps[] | undefined;
  previousMonthGoals: GoalProps[] | undefined;
  tasks: TaskProps[] | undefined;
}
