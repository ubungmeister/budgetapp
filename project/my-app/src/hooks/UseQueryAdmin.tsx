import { useQuery } from '@tanstack/react-query';

import {
  getAllFamilyGoals,
  getCashFamilyCashFlow,
} from '../compnents/admin-overview/api';
import { CashFlowProps } from '../compnents/cash-flow/types';
import { GoalProps } from '../compnents/goals/types';

// useGoals.js
export function useAdminGoals(key: string, month: Date) {
  return useQuery<GoalProps[]>([key, month], () => getAllFamilyGoals(month));
}

export function useAdminCashFlow(key: string, month: Date) {
  return useQuery<CashFlowProps[]>([key, month], () =>
    getCashFamilyCashFlow(month)
  );
}
