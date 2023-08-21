import { PmType } from '../../compnents/pocket-money/types'
import { CashFlowProps } from '../cash-flow/types'

export interface OverviewControlsProps {
  setIsMonthChange: React.Dispatch<React.SetStateAction<string>>
  pocketMoney: PmType | undefined
}

export interface OverviewGraphProps {
  cashFlow: CashFlowProps[]
  pocketMoney: PmType | undefined
}
