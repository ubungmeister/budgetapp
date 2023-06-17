import axios from 'axios'
import { useEffect, useState } from 'react'
import { BudgetData } from '../../compnents/budget/types'
import BudgetList from '../../compnents/budget/BudgetList'
import BudgetControls from '../../compnents/budget/BudgetControls'

const Budget = () => {
  const [isMonthChange, setIsMonthChange] = useState('')
  const [currentMonth, setCurrentMonth] = useState('')
  const [monthsAndBudget, setMonthsAndBudget] = useState<Array<BudgetData>>([])
  const [isChangeCancel, setChangeCancel] = useState(false)

  const userID = window.localStorage.getItem('userID')

  useEffect(() => {
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
      const arrayofMonth = [] as Array<any>

      for (let i = 0; i < 6; i++) {
        const newDate = new Date(year, month + i, 1)
        newDate.setUTCHours(0, 0, 0, 0)
        arrayofMonth.push(newDate.toISOString())
      }

      try {
        const result = await axios.get(
          `http://localhost:1000/budget/get-budget`,
          {
            params: {
              monthYear: date,
              userID,
            },
          }
        )
        // need to compare arrayofMonth and result.data and if there is no data for that month,
        // then create an object contains that date and amount 0

        const data = result.data.budget

        const arrayofMonthsAndBudget = [] as Array<any>

        for (let i = 0; i < arrayofMonth.length; i++) {
          const date = arrayofMonth[i]
          const found = data.find((item: any) => item.month === date)
          if (!found) {
            arrayofMonthsAndBudget.push({ month: date, amount: 0 })
          } else {
            arrayofMonthsAndBudget.push(found)
          }
        }
        setMonthsAndBudget(arrayofMonthsAndBudget)
      } catch (error) {
        console.error(error)
      }
    }

    getData()
    setIsMonthChange('')
  }, [isMonthChange, isChangeCancel])

  const handleSaveBudget = async () => {
    try {
      const result = await axios.post(
        `http://localhost:1000/budget/update-budget`,
        {
          budget: monthsAndBudget,
          userID,
        }
      )
      console.log(result)
    } catch (error) {
      console.error(error)
    }
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
