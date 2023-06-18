import React from 'react'
import { BudgetListProps } from './types'
const PocketMoneyList = ({ monthsAndBudget }: BudgetListProps) => {
  return (
    <div className="flex space-x-10">
      {monthsAndBudget.map((item, index) => {
        const date = new Date(item.month)
        return (
          <div className="flex flex-col">
            <p key={index}>
              {date.toLocaleString('default', { month: 'long' })}
            </p>
            <p>{item.amount}</p>
          </div>
        )
      })}
    </div>
  )
}

export default PocketMoneyList
