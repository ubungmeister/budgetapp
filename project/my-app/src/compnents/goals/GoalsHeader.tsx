import { cashflowHeaderProps } from '../../compnents/cash-flow/types'
import { formatDecimals } from '../../compnents/helpers/utils'

const GoalsHeader = ({ cashFlow, pocketMoney }: cashflowHeaderProps) => {
  const amounts = cashFlow.map(item => item.amount)

  const expense = formatDecimals(
    amounts.filter(el => el < 0).reduce((acc, el) => acc + el, 0)
  )
  const income = formatDecimals(
    amounts.filter(el => el > 0).reduce((acc, el) => acc + el, 0)
  )
  const otherIncome = income - (pocketMoney?.amount || 0)

  const total = formatDecimals(Number(income) - Number(-expense))
  return (
    <div className="flex flex-row space-x-5">
      <div>
        <div>Pocket money: {pocketMoney?.amount || 0}</div>
        <div>Other income: {otherIncome}</div>
        <div>Total income:{income}</div>
      </div>
      <div>
        <div>Spendings:</div>
        <div>Savings on goals:</div>
        <div>Total spendings:{expense}</div>
      </div>
      <div>Total:{total}</div>
    </div>
  )
}

export default GoalsHeader
