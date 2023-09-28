import { BudgetListProps } from './types'
import { capitalizeFirstLetter } from '../helpers/utils'

const BudgetTable = ({
  monthsAndBudget,
  setMonthsAndBudget,
}: BudgetListProps) => {
  return (
    <div className="flex flex-col w-full pt-7">
      <div className="flex flex-row ">
        <div className="pl-5 overflow-x-hidden text-ellipsis min-w-[10rem] max-w-[10rem] space-y-2 my-4 divide-y">
          <p className="font-semibold pb-4">Month</p>
          <p className="pt-6">Budget</p>
        </div>
        <div className="flex flex-row ">
          {monthsAndBudget.map((monthEntry, index) => {
            const month = new Date(monthEntry.month)
            const monthName = month.toLocaleString('default', { month: 'long' })
            return (
              <div
                key={index}
                className="flex flex-col text-center space-y-2 min-w-[4rem] md:min-w-[7rem] lg:min-w-[10rem] my-4 divide-y"
              >
                <div className="center items-start pb-4 ">
                  {capitalizeFirstLetter(monthName)}
                </div>
                <div className="pt-6">
                  <input
                    className="border border-info-content-light w-20 h-9 text-center"
                    onChange={e => {
                      const updatedArray = [...monthsAndBudget]
                      updatedArray[index].amount =
                        parseFloat(e.target.value) || 0
                      setMonthsAndBudget(updatedArray)
                    }}
                    type="number"
                    value={monthEntry.amount}
                    min={0}
                    max={1000000}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BudgetTable
