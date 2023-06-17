export interface BudgetData {
  id?: string
  month: Date
  familyID?: string
  amount: number
}

export interface BudgetListProps {
  monthsAndBudget: Array<BudgetData>
  setMonthsAndBudget: React.Dispatch<React.SetStateAction<BudgetData[]>>
}

export interface BudgetControlsProps {
  handleSaveBudget: () => void
  setChangeCancel: (value: React.SetStateAction<boolean>) => void
  setIsMonthChange: React.Dispatch<React.SetStateAction<string>>
}
