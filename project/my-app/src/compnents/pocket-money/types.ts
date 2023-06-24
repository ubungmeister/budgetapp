import { BudgetData } from '../budget/types'

export interface BudgetListProps {
  monthsAndBudget: Array<BudgetData>
}

export interface PmTableType {
  [month: string]: {
    [userId: string]: PmData
  }
}
export interface PmType {
  month: string
  amount: number
  userId: string
  id?: string
}

export interface PmData {
  id?: string
  userID?: string
  username?: string
  amount?: number
  month?: string
}

export interface PmControlsProps {
  handleSavePm: () => void
  setChangeCancel: (value: React.SetStateAction<boolean>) => void
  setIsMonthChange: React.Dispatch<React.SetStateAction<string>>
}
