import { BudgetData } from '../budget/types'
import { UserData } from '../users/types'

export interface PmType {
  month: Date
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

export interface PmTableProps {
  users: Array<UserData>
  monthsAndBudget: Array<BudgetData>
  pocketMoney: Array<PmType>
  setPocketMoney: React.Dispatch<React.SetStateAction<PmType[]>>
}

export interface PmControlsProps {
  handleSavePm: () => void
  setChangeCancel: (value: React.SetStateAction<boolean>) => void
  setIsMonthChange: React.Dispatch<React.SetStateAction<string>>
}

export interface PmListProps {
  monthsAndBudget: Array<BudgetData>
}
