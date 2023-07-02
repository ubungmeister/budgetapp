import axios from 'axios'
import { useEffect, useState } from 'react'
import { BudgetData } from '../../compnents/budget/types'
import BudgetList from '../../compnents/budget/BudgetList'
import BudgetControls from '../../compnents/budget/BudgetControls'
import { updateBudgets, getBudget } from '../../compnents/budget/api'

const Budget = () => {
  const [isMonthChange, setIsMonthChange] = useState('')
  const [currentMonth, setCurrentMonth] = useState('')
  const [monthsAndBudget, setMonthsAndBudget] = useState<Array<BudgetData>>([])
  const [isChangeCancel, setChangeCancel] = useState<boolean>(false)

  const userID = window.localStorage.getItem('userID')
  useEffect(() => {
    if (!userID) return
    const getData = async () => {
      const date = new Date(currentMonth || new Date())

      if (isMonthChange) {
        if (isMonthChange === 'next') {
          date.setMonth(date.getMonth() + 1)
          setCurrentMonth(date.toISOString())
        } else {
          date.setMonth(date.getMonth() - 1)
          setCurrentMonth(date.toISOString())
        }
      }

      const month = date.getMonth() + 1
      const year = date.getFullYear()
      const monthArray = [] as Array<any>

      const NUM_MONTHS = 6
      for (let i = 0; i < NUM_MONTHS; i++) {
        const newDate = new Date(year, month + i, 1)
        newDate.setUTCHours(0, 0, 0, 0)
        monthArray.push(newDate.toISOString())
      }

      try {
        const budget = await getBudget(date, userID)
        //compare arrayofMonth and result.data and if there is no data for that month,
        // then create an object contains that date and amount 0

        const data = await budget?.data.budget

        const monthsAndBudgetArray = [] as Array<any>

        for (let i = 0; i < monthArray.length; i++) {
          const date = monthArray[i]
          const found = data.find((item: any) => item.month === date)
          if (!found) {
            monthsAndBudgetArray.push({ month: date, amount: 0 })
          } else {
            monthsAndBudgetArray.push(found)
          }
        }
        setMonthsAndBudget(monthsAndBudgetArray)
      } catch (error) {
        console.error(error)
      }
    }

    getData()
    setIsMonthChange('')
  }, [isMonthChange, isChangeCancel])

  const handleSaveBudget = async () => {
    if (!userID) return
    await updateBudgets(monthsAndBudget, userID)
  }

  return (
    <div>
      <div>
        <BudgetControls
          setIsMonthChange={setIsMonthChange}
          handleSaveBudget={handleSaveBudget}
          setChangeCancel={setChangeCancel}
        />
        <BudgetList
          monthsAndBudget={monthsAndBudget}
          setMonthsAndBudget={setMonthsAndBudget}
        />
      </div>
    </div>
  )
}

export default Budget
