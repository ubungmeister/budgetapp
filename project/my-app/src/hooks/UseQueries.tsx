import { useQuery } from '@tanstack/react-query';

import { getAdminBudget } from '../api/budget';
import { getCashFamilyCashFlow, getCashFlowForUsers } from '../api/cash-flow';
import { getAllFamilyGoals, getGoalsForUsers } from '../api/goals';
import { getPocketMoneyData, getPocketMoneyForUser } from '../api/pocket-money';
import { getAllTasks, getAllTasksByMonth } from '../api/tasks';
import { getAllUsers, getUser } from '../api/users';
import { BudgetData } from '../compnents/budget/types';
import { CashFlowProps } from '../compnents/cash-flow/types';
import { GoalProps } from '../compnents/goals/types';
import { PmType } from '../compnents/pocket-money/types';
import { TaskProps } from '../compnents/tasks/types';
import { UserData } from '../compnents/users/types';

// useGoals.js
export function useAdminGoals(key: string, month: Date) {
  return useQuery<GoalProps[]>(
    [key, month],
    () => getAllFamilyGoals(month) || []
  );
}

export function useAdminCashFlow(key: string, month: Date) {
  return (
    useQuery<CashFlowProps[]>([key, month], () =>
      getCashFamilyCashFlow(month)
    ) || []
  );
}

export function useAdminTasks(key: string, month: Date) {
  return useQuery<TaskProps[]>(
    [key, month],
    () => getAllTasksByMonth(month) || []
  );
}

export function useAdminBudget(key: string, month: Date) {
  return useQuery<BudgetData[]>(
    [key, month],
    () => getAdminBudget(month) || []
  );
}

export function useAdminPocketMoney(key: string, month: Date) {
  return useQuery<PmType[]>(
    [key, month],
    () => getPocketMoneyData(month) || []
  );
}

export function useTasks() {
  return useQuery<TaskProps[]>(['tasks'], () => getAllTasks());
}

export function usePocketMoney(key: string, month: Date) {
  return useQuery<PmType>([key, month], () => getPocketMoneyForUser(month));
}

export function useCashFlow(key: string, month: Date) {
  return useQuery<CashFlowProps[]>([key, month], () =>
    getCashFlowForUsers(month)
  );
}

export function useTasksUsers(key: string, month: Date) {
  return useQuery<TaskProps[]>([key, month], () => getAllTasksByMonth(month));
}

export function useGoalsUsers() {
  return useQuery<GoalProps[]>(['goals'], () => getGoalsForUsers());
}

export function useUsers() {
  return useQuery<UserData[]>(['users'], () => getAllUsers());
}

export function useUser() {
  return useQuery<UserData>(['user'], () => getUser());
}
