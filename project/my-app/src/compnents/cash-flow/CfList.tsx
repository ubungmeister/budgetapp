import React from 'react'
import { CashFlowListProps } from './types'
import { optionsExpense, optionsIncome } from './options'

const CfList = ({
  setFormOpen,
  cashFlow,
  setSelectedCashFlow,
  selectedCashFlow,
}: CashFlowListProps) => {
  return (
    <div>
      <h2>Cash Flow</h2>
      <div className="flex flex-col">
        {cashFlow.map(item => {
          const options = item.amount < 0 ? optionsExpense : optionsIncome
          const selectedOption = options.find(el => el.value === item.category)
          return (
            <div key={item.id} className="flex flex-row space-x-5">
              {selectedOption && (
                <img
                  className="w-10 h-10"
                  src={selectedOption.src}
                  alt={selectedOption.label}
                />
              )}
              <div>{item.category}</div>
              <div>{new Date(item.start_date).toLocaleDateString('en-DE')}</div>
              <div>{item.description}</div>
              <div>{item.amount}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CfList
