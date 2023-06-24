import { BudgetListProps } from './types'
const PmUtilization = ({ monthsAndBudget }: BudgetListProps) => {
  return (
    <div className="flex space-x-10">
      <div className="flex flex-col">
        <div>Month</div>
        <div>Budget</div>
      </div>

      {monthsAndBudget.map((item, index) => {
        const date = new Date(item.month)
        return (
          <div className="flex flex-col">
            <p key={index}>
              {date.toLocaleString('default', { month: 'long' })}
            </p>
            <p>{item.amount}</p>
          </div>
        )
      })}
    </div>
  )
}

export default PmUtilization
