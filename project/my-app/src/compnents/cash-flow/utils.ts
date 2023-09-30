import { getAllGoals } from '../cash-flow/api';
import { CashFlowProps } from '../cash-flow/types';
import { CategoryType } from './types';

type FindCategoryProps = {
  selectedCashFlow: CashFlowProps | null;
  setCategory: React.Dispatch<
    React.SetStateAction<{ category: string; saving_goal_Id: string }>
  >;
  setCategoryType: React.Dispatch<React.SetStateAction<string>>;
};

type checkFormProps = {
  category: CategoryType;
  categoryType: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  data: any;
  totalIncome: number;
  expense: number;
};

export const findCategory = async ({
  selectedCashFlow,
  setCategory,
  setCategoryType,
}: FindCategoryProps) => {
  const goals = await getAllGoals();
  const goalName = goals?.find(
    (el: any) => el.id === selectedCashFlow?.saving_goal_Id
  );
  if (goalName) {
    setCategory({ category: goalName.name, saving_goal_Id: goalName.id });
    setCategoryType(selectedCashFlow?.category_type || '');
  } else {
    setCategory({
      category: selectedCashFlow?.category || '',
      saving_goal_Id: '',
    });
    setCategoryType(selectedCashFlow?.category_type || '');
  }
};

export const checkForm = ({
  category,
  categoryType,
  data,
  setError,
  totalIncome,
  expense,
}: checkFormProps) => {
  if (!category) {
    setError('Please select a category');
    return;
  }
  let amount = data.amount;
  if (!categoryType) {
    setError('Please select a category type');
    return;
  }
  if (categoryType === 'Expense' || categoryType === 'Goals') {
    if (totalIncome < Math.abs(expense) + Math.abs(amount)) {
      setError(`You don't have enough money`);
      return;
    }
    amount = Math.abs(amount) * -1;
  }
  if (categoryType === 'Income') {
    amount = Math.abs(amount);
  }
  return amount;
};
