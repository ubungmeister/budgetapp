import React from 'react'

import { PmControlsProps } from './types'

const PmControls = ({
  setIsMonthChange,
  handleSavePm,
  setChangeCancel,
}: PmControlsProps) => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex space-x-10">
          <button onClick={() => setIsMonthChange('prev')}>Previous</button>
          <button onClick={() => setIsMonthChange('next')}>Next</button>
        </div>
        <div className="flex space-x-10 px-20">
          <button onClick={() => handleSavePm()}>Save</button>
          <button onClick={() => setChangeCancel(true)}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default PmControls
