import { OverviewGraphProps } from './types'

import { expenseCalc, incomeCalc, goalsCalc } from '../helpers/utils'

const OverviewGraph = ({ cashFlow, pocketMoney }: OverviewGraphProps) => {
  const sortedCashFlowByDate = cashFlow.sort(function (a, b) {
    const dateA = new Date(a.start_date)
    const dateB = new Date(b.start_date)

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      // Handle invalid dates
      return 0
    }

    return dateB.getTime() - dateA.getTime()
  })
  const amounts = sortedCashFlowByDate.map(item => item.amount)

  const expense = expenseCalc(sortedCashFlowByDate)
  const income = incomeCalc(amounts)
  const totalIncome = income + (pocketMoney?.amount || 0)
  const goals = goalsCalc(sortedCashFlowByDate) * -1

  // go though each item in the array and create categories
  // go through each category and sum the amounts
  const categories = [] as Array<string>
  for (let i = 0; i < cashFlow.length; i++) {
    // cashFlow[i].category_type.includes(categories)
    !categories.includes(cashFlow[i].category_type) &&
      categories.push(cashFlow[i].category_type)
  }

  console.log(categories)
  return (
    <div>
      <div className="items-center flex flex-col">
        <div>Monthly income:{totalIncome}</div>
        <div>Monthly spendings:{expense}</div>
        <div>Total amount saved: {goals}</div>
      </div>
    </div>
  )
}

export default OverviewGraph
