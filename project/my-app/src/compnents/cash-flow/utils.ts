import { getAllGoals } from '../cash-flow/api';
import { CashFlowProps } from '../cash-flow/types';

type FindCategoryProps = {
  selectedCashFlow: CashFlowProps | null;
  setCategory: React.Dispatch<
    React.SetStateAction<{ category: string; saving_goal_Id: string }>
  >;
  setCategoryType: React.Dispatch<React.SetStateAction<string>>;
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

export const formattedDate = (date: Date) => {
  const newDate = new Date(date);
  return newDate.toLocaleString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const disabledEditing = (item: CashFlowProps) => {
  const isDisabled =
    item.category_type !== 'Goals' &&
    item.category !== 'Refund' &&
    item.category !== 'Task';
  return isDisabled;
};
