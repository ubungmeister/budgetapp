import { useQuery } from '@tanstack/react-query';

import { getAdminBudget } from '../api/budget';
import { getCashFamilyCashFlow } from '../api/cash-flow';
import { getAllFamilyGoals } from '../api/goals';
import { getAllTasksByMonth } from '../api/tasks';
import { BudgetData } from '../compnents/budget/types';
import { CashFlowProps } from '../compnents/cash-flow/types';
import { GoalProps } from '../compnents/goals/types';
import { TaskProps } from '../compnents/tasks/types';

// useGoals.js
export function useAdminGoals(key: string, month: Date) {
  return useQuery<GoalProps[]>([key, month], () => getAllFamilyGoals(month));
}

export function useAdminCashFlow(key: string, month: Date) {
  return useQuery<CashFlowProps[]>([key, month], () =>
    getCashFamilyCashFlow(month)
  );
}

export function useAdminTasks(key: string, month: Date) {
  return useQuery<TaskProps[]>([key, month], () => getAllTasksByMonth(month));
}

export function useAdminBudget(key: string, month: Date) {
  return useQuery<BudgetData[]>([key, month], () => getAdminBudget(month));
}
