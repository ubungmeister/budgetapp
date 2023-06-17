import { BudgetListProps } from './types'

const BudgetList = ({
  monthsAndBudget,
  setMonthsAndBudget,
}: BudgetListProps) => {
  return (
    <div>
      {monthsAndBudget.map((item, index) => {
        const date = new Date(item.month)
        return (
          <div>
            <div key={index}>
              {date.toLocaleString('default', { month: 'long' })}
            </div>
            <div>
              <p>Amount</p>
              <input
                onChange={e => {
                  const updatedArray = [...monthsAndBudget]
                  updatedArray[index].amount = parseFloat(e.target.value)
                  setMonthsAndBudget(updatedArray)
                }}
                type="number"
                value={item.amount}
                min={0}
                max={1000000}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BudgetList
