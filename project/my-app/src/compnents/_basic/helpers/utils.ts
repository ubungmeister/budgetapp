import { CashFlowProps } from '../../cash-flow/types';
import { GoalProps } from '../../goals/types';
import { TaskStatus } from '../../tasks/types';

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

export const percentageBetweenTwoNumbers = (num1: number, num2: number) => {
  if (num1 === 0 || num2 === 0) {
    return 0;
  }
  const result = ((num1 - num2) / num2) * 100;
  return formatDecimals(result);
};

export const differenceBetweenTwoNumbers = (num1: number, num2: number) => {
  const result = num1 - num2;
  return formatDecimals(result);
};

export const performancePercentage = (goal: GoalProps | null) => {
  if (!goal) {
    return 0;
  }
  const percentage = (goal.currentAmount / goal.goalAmount) * 100;
  return percentage;
};

export const statusOptions = [
  {
    value: TaskStatus.ON_REVIEW,
    label: 'Review',
  },
  {
    value: TaskStatus.APPROVED,
    label: 'Approved',
  },
  {
    value: TaskStatus.DECLINED,
    label: 'Declined',
  },
];

export const statusLabel = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.APPROVED:
      return 'Approved';
    case TaskStatus.ON_REVIEW:
      return 'On review';
    case TaskStatus.DECLINED:
      return 'Declined';
    default:
      return 'Pending';
  }
};

export const getSixMonths = (currentMonth: Date) => {
  const month = currentMonth.getMonth() + 1;
  const year = currentMonth.getFullYear();
  const monthArray = [] as Array<any>;

  const NUM_MONTHS = 6;
  for (let i = 0; i < NUM_MONTHS; i++) {
    const newDate = new Date(year, month + i, 1);
    newDate.setUTCHours(0, 0, 0, 0);
    monthArray.push(newDate.toISOString());
  }
  return monthArray;
};
