import React from 'react'
import { CashFlowControlsProps } from './types'

const CfControls = ({
  setIsMonthChange,
  pocketMoney,
  setFormOpen,
  setSelectedCashFlow,
}: CashFlowControlsProps) => {
  return (
    <div className="">
      <div className="flex space-x-10 justify-center items-center mt-10">
        <button onClick={() => setIsMonthChange('prev')}>Previous</button>
        <div>
          {pocketMoney?.month.toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </div>
        <button onClick={() => setIsMonthChange('next')}>Next</button>
        <div
          onClick={() => {
            setFormOpen(true)
            setSelectedCashFlow(null)
          }}
        >
          Add +
        </div>
      </div>
    </div>
  )
}

export default CfControls
