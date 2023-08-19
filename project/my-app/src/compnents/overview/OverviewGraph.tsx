import { OverviewGraphProps } from './types'

const OverviewGraph = ({ cashFlow }: OverviewGraphProps) => {
  const sortedCashFlowByDate = cashFlow.sort(function (a, b) {
    const dateA = new Date(a.start_date)
    const dateB = new Date(b.start_date)

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      // Handle invalid dates
      return 0
    }

    return dateB.getTime() - dateA.getTime()
  })
  return (
    <div>
      <div>{sortedCashFlowByDate.map(el => el.category)}</div>
    </div>
  )
}

export default OverviewGraph
