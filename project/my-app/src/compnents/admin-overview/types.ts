import { CashFlowProps } from '../cash-flow/types';
import { GoalProps } from '../goals/types';
import Goals from './../../pages/user/goals/Goals';

export interface AdminHeaderProps {
  cashFlow: CashFlowProps[] | undefined;
  previousMonthCashFlow: CashFlowProps[] | undefined;
  goals: GoalProps[] | undefined;
  previousMonthGoals: GoalProps[] | undefined;
}
