import { cashflowHeaderProps } from './types'
import { formatDecimals } from '../helpers/utils'
import { expenseCalc, incomeCalc, goalsCalc } from '../helpers/utils'

const CfHeader = ({ cashFlow, pocketMoney }: cashflowHeaderProps) => {
  const amounts = cashFlow.map(item => item.amount)

  const expense = expenseCalc(cashFlow)
  const income = incomeCalc(amounts)
  const goals = goalsCalc(cashFlow)
  const totalIncome = income + (pocketMoney?.amount || 0)

  const total = formatDecimals(Number(totalIncome) - Number(-(expense + goals)))

  return (
    <div className="flex flex-row space-x-5">
      <div>
        <div>Total income:{totalIncome}</div>
        <div>Pocket money: {pocketMoney?.amount || 0}</div>
        <div>Other income:{income}</div>
      </div>
      <div>
        <div>Spendings:{goals + expense}</div>
        <div>Savings on goals:{goals * -1}</div>
        <div>Spend ammount:{expense}</div>
      </div>
      <div>Left:{total}</div>
    </div>
  )
}

export default CfHeader
