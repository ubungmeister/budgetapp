import { CashFlowProps } from '../../cash-flow/types';

export const formatDecimals = (item: number) => {
  return Number(item.toFixed(2));
};

export const expenseCalculation = (cashFlow: CashFlowProps[]) => {
  //filter the array to get only the expenses
  const filteredExpense = cashFlow.filter(
    (item) => item.category_type === 'Expense'
  );
  //sum all the expenses
  const expenses = filteredExpense.map((expense) => expense.amount);
  return formatDecimals(expenses.reduce((acc, amount) => acc + amount, 0));
};

export const incomeCalculation = (amounts: Array<number>) => {
  //filter the array to get only the incomes and sum them
  return formatDecimals(
    amounts.filter((item) => item > 0).reduce((acc, el) => acc + el, 0)
  );
};

export const goalsCalculation = (cashFlow: CashFlowProps[]) => {
  //filter the array to get only the goals and sum them
  const filteredGoals = cashFlow.filter(
    (item) => item.category_type === 'Goals'
  );
  const goals = filteredGoals.map((goal) => goal.amount);
  return formatDecimals(goals.reduce((acc, amount) => acc + amount, 0));
};

export const capitalizeFirstLetter = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};
