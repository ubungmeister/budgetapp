export interface BudgetData {
  id?: string;
  month: Date;
  familyID?: string;
  amount: number;
}

export interface BudgetListProps {
  monthsAndBudget: Array<BudgetData>;
  setMonthsAndBudget: React.Dispatch<React.SetStateAction<BudgetData[]>>;
}
