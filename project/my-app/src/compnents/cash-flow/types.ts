import { PmType } from '../../compnents/pocket-money/types'
import { set } from 'zod'

export interface CashFlowControlsProps {
  setIsMonthChange: React.Dispatch<React.SetStateAction<string>>
  pocketMoney: PmType | undefined
}

export interface CashFlowProps {
  amount: number
  category: string
  description: string
  id: string
  start_date: Date
  userId: string
}

export interface CategotyTypeProps {
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
  isExpense: boolean
}

export interface CashFlowFormProps {
  formOpen: boolean
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  category: string
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export interface CashFlowListProps {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  cashFlow: CashFlowProps[]
  setSelectedCashFlow: React.Dispatch<React.SetStateAction<CashFlowProps | ''>>
  selectedCashFlow: CashFlowProps | ''
}
