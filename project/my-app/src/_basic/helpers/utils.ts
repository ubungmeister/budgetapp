import { CashFlowProps } from '../../compnents/cash-flow/types';

export const formatDecimals = (item: number) => {
  return Number(item.toFixed(2));
};

export const expenseCalc = (cashFlow: CashFlowProps[]) => {
  const filteredExpense = cashFlow.filter(
    (el) => el.category_type === 'Expense'
  );
  const expense = filteredExpense.map((el) => el.amount);
  return formatDecimals(expense.reduce((acc, el) => acc + el, 0));
};

export const incomeCalc = (amounts: Array<number>) => {
  return formatDecimals(
    amounts.filter((el) => el > 0).reduce((acc, el) => acc + el, 0)
  );
};

export const goalsCalc = (cashFlow: CashFlowProps[]) => {
  const filteredGoals = cashFlow.filter((el) => el.category_type === 'Goals');
  const goals = filteredGoals.map((el) => el.amount);
  return formatDecimals(goals.reduce((acc, el) => acc + el, 0));
};

export const capitalizeFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};
