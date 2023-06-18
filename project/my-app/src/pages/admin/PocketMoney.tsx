import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PocketMoneyList from '../../compnents/pocket-money/PocketMoneyList'

const PocketMoney = () => {
  const [currentMonth, setCurrentMonth] = useState('')
  const [isMonthChange, setIsMonthChange] = useState('')
  const [monthsAndBudget, setMonthsAndBudget] = useState<Array<any>>([])
  const userID = window.localStorage.getItem('userID')
  console.log('monthsAndBudget', monthsAndBudget)

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
      const monthArray = [] as Array<any>

      const NUM_MONTHS = 6
      for (let i = 0; i < NUM_MONTHS; i++) {
        const newDate = new Date(year, month + i, 1)
        newDate.setUTCHours(0, 0, 0, 0)
        monthArray.push(newDate.toISOString())
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
        //compare arrayofMonth and result.data and if there is no data for that month,
        // then create an object contains that date and amount 0

        const data = result.data.budget

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
      try {
        const result = await axios.get(
          'http://localhost:1000/pocketmoney/get-pocket-money',
          {
            params: {
              monthYear: date,
              userID,
            },
          }
        )
      } catch (error) {}
    }

    getData()
    setIsMonthChange('')
  }, [isMonthChange])

  return (
    <div>
      <div>
        <PocketMoneyList monthsAndBudget={monthsAndBudget} />
      </div>
    </div>
  )
}

export default PocketMoney
