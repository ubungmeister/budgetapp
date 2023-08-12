import { PmType } from '../../compnents/pocket-money/types'
import { set } from 'zod'
import CashFlow from './../../pages/cash-flow/CashFlow'

export interface CashFlowControlsProps {
  setIsMonthChange: React.Dispatch<React.SetStateAction<string>>
  pocketMoney: PmType | undefined
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedCashFlow: React.Dispatch<
    React.SetStateAction<CashFlowProps | null>
  >
}

export interface CashFlowProps {
  amount: number
  category: string
  description: string
  saving_goal_Id?: string | ''
  id?: string
  start_date: Date
  userId: string
  category_type: string
}

export interface CategotyTypeProps {
  category: { category: string; saving_goal_Id: string }
  // set object {category: string, goalId: string}
  setCategory: React.Dispatch<
    React.SetStateAction<{ category: string; saving_goal_Id: string }>
  >
  categoryType: string
}

export interface CashFlowFormProps {
  formOpen: boolean
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  selectedCashFlow: CashFlowProps | null
  cashFlow: CashFlowProps[]
}

export interface CashFlowListProps {
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>
  cashFlow: CashFlowProps[]
  setSelectedCashFlow: React.Dispatch<
    React.SetStateAction<CashFlowProps | null>
  >
  selectedCashFlow: CashFlowProps | null
  setCashFlowDeleted: React.Dispatch<React.SetStateAction<boolean>>
}

export interface optionsGoalsProps {
  label: string
  id: string
  src: string
  currentAmount: number
  goalAmount: number
  isActive: boolean
}

export interface cashflowHeaderProps {
  pocketMoney: PmType | undefined
  cashFlow: CashFlowProps[]
}
