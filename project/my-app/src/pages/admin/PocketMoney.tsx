import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PmControls from '../../compnents/pocket-money/PmControls'
import { PmType } from '../../compnents/pocket-money/types'
import { editPocketMoney } from '../../compnents/pocket-money/api'
import { UserData } from '../../compnents/users/types'
import { v4 as uuidv4 } from 'uuid'
import { BudgetData } from '../../compnents/budget/types'
import PmTable from '../../compnents/pocket-money/PmTable'

const PocketMoney = () => {
  const [currentMonth, setCurrentMonth] = useState('')
  const [isMonthChange, setIsMonthChange] = useState('')
  const [monthsAndBudget, setMonthsAndBudget] = useState<Array<BudgetData>>([])
  const [pocketMoney, setPocketMoney] = useState<Array<PmType>>([])
  const [isChangeCancel, setChangeCancel] = useState<boolean>(false)
  const [users, setUsers] = useState<Array<UserData>>([])

  console.log('monthsAndBudget', monthsAndBudget)

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
        const pocketMoney = await axios.get(
          'http://localhost:1000/pocketmoney/get-pocket-money',
          {
            params: {
              monthYear: date,
              userID,
            },
          }
        )
        setPocketMoney(pocketMoney.data.pocketMoney)
      } catch (error) {}
      try {
        const result = await axios.get(
          `http://localhost:1000/users/get-users`,
          {
            params: {
              userID,
            },
          }
        )
        setUsers(result.data.users)
      } catch (error) {
        console.error(error)
      }
    }

    getData()
    setIsMonthChange('')
  }, [isMonthChange, isChangeCancel])

  const handleSavePm = async () => {
    if (!userID) return
    await editPocketMoney(pocketMoney, userID)
  }

  return (
    <div>
      <div>
        <PmControls
          setIsMonthChange={setIsMonthChange}
          handleSavePm={handleSavePm}
          setChangeCancel={setChangeCancel}
        />
        <PmTable
          monthsAndBudget={monthsAndBudget}
          pocketMoney={pocketMoney}
          users={users}
          setPocketMoney={setPocketMoney}
        />
      </div>
    </div>
  )
}

export default PocketMoney
