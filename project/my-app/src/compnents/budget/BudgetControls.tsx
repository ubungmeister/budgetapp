import { BudgetControlsProps } from './types'

const BudgetControls = ({
  setIsMonthChange,
  handleSaveBudget,
  setChangeCancel,
}: BudgetControlsProps) => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex space-x-10">
          <button onClick={() => setIsMonthChange('prev')}>Previous</button>
          <button onClick={() => setIsMonthChange('next')}>Next</button>
        </div>
        <div className="flex space-x-10 px-20">
          <button onClick={() => handleSaveBudget()}>Save</button>
          <button onClick={() => setChangeCancel(true)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default BudgetControls
