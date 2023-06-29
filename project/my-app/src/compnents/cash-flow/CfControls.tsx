import React from 'react'
import { CashFlowControlsProps } from './types'

const CfControls = ({ setIsMonthChange }: CashFlowControlsProps) => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex space-x-10">
          <button onClick={() => setIsMonthChange('prev')}>Previous</button>
          <button onClick={() => setIsMonthChange('next')}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default CfControls
