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
  saving_goal_Id?: string | ''
  id: string
  start_date: Date
  userId: string
  category_type: string
}

export interface CategotyTypeProps {
  category: { category: string; goalId: string }
  // set object {category: string, goalId: string}
  setCategory: React.Dispatch<
    React.SetStateAction<{ category: string; goalId: string }>
  >
  categoryType: string
}

export interface CashFlowFormProps {
  formOpen: boolean
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedCashFlow: CashFlowProps | null
}

export interface CashFlowListProps {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  cashFlow: CashFlowProps[]
  setSelectedCashFlow: React.Dispatch<
    React.SetStateAction<CashFlowProps | null>
  >
  selectedCashFlow: CashFlowProps | null
}

export interface optionsGoalsProps {
  label: string
  id: string
  src: string
  currentAmount: number
  goalAmount: number
  isActive: boolean
}
