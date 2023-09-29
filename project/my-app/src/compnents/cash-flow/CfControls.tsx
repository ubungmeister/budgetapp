import React from 'react'
import { CashFlowControlsProps } from './types'
import { BsArrowLeftSquare, BsArrowRightSquare, BsSave } from 'react-icons/bs'

const CfControls = ({
  setIsMonthChange,
  pocketMoney,
  setFormOpen,
  setSelectedCashFlow,
}: CashFlowControlsProps) => {
  return (
    <div>
      <div className="flex flex-row justify-start">
        <div className="flex space-x-3 mx-5">
          <button onClick={() => setIsMonthChange('prev')}>
            <BsArrowLeftSquare className="icons-controls" />
          </button>
          <button onClick={() => setIsMonthChange('next')}>
            <BsArrowRightSquare className="icons-controls" />
          </button>
        </div>
        <div className="tex  button-disabled px-2 min-w-[10rem] max-w-[8rem] mr-5">
          <p className="text-center justify-center pt-2">
            {pocketMoney?.month.toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
        <button
          className="button-month flex flex-row space-x-2 button-month px-5 py-2"
          onClick={() => {
            setFormOpen(true)
            setSelectedCashFlow(null)
          }}
        >
          <div className="flex flex-row space-x-2">
            <div className="py-1">
              <BsSave />
            </div>
            <span>Add +</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default CfControls
