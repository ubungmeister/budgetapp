import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PmControls from '../../compnents/pocket-money/PmControls'
import { PmType } from '../../compnents/pocket-money/types'
import { editPocketMoney } from '../../compnents/pocket-money/api'
import { v4 as uuidv4 } from 'uuid'

const PocketMoney = () => {
  const [currentMonth, setCurrentMonth] = useState('')
  const [isMonthChange, setIsMonthChange] = useState('')
  const [monthsAndBudget, setMonthsAndBudget] = useState<Array<any>>([])
  const [pocketMoney, setPocketMoney] = useState<Array<PmType>>([])
  const [isChangeCancel, setChangeCancel] = useState<boolean>(false)
  const [users, setUsers] = useState<Array<any>>([])

  console.log('pocketMoney', pocketMoney)

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

  const renderPocketMoneyInputs = () => {
    const userInputs = users.map(user => {
      const userPocketMoney = pocketMoney.filter(
        entry => entry.userId === user.id
      )

      const inputs = monthsAndBudget.map((monthEntry, index) => {
        const pocketMoneyEntry = userPocketMoney.find(
          entry => entry.month === monthEntry.month
        )
        const amount = pocketMoneyEntry ? pocketMoneyEntry.amount : 0

        return (
          <input
            key={index}
            value={amount}
            type="number"
            min={0}
            max={1000000}
            onChange={e =>
              handleInputChange(
                e.target.value,
                monthEntry.month,
                user.id,
                pocketMoneyEntry?.id
              )
            }
          />
        )
      })

      return (
        <div className="flex  flex-row justify-between pr-60">
          <h3 className="px-5 max-w-[20%] overflow-hidden ">{user.username}</h3>
          <div className="flex items-center">{inputs}</div>
        </div>
      )
    })

    return userInputs
  }

  const handleInputChange = (
    value: string,
    month: any,
    userId: any,
    pocketMoneyID?: string
  ) => {
    if (pocketMoneyID === undefined) {
      const newPocketMoneyEntry = {
        id: uuidv4(),
        amount: parseFloat(value),
        month,
        userId,
      }
      setPocketMoney([...pocketMoney, newPocketMoneyEntry])
    } else {
      const updatedPocketMoney = pocketMoney.map(entry => {
        if (entry.userId === userId && entry.month === month) {
          return { ...entry, amount: parseFloat(value) }
        }
        return entry
      })
      setPocketMoney(updatedPocketMoney)
    }
  }

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
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="px-5">
            <p>Month</p>
            <p>Budget</p>
          </div>
          <div className="flex flex-row space-x-4">
            {monthsAndBudget.map((monthEntry, index) => {
              const month = new Date(monthEntry.month)
              return (
                <div
                  className="flex flex-col space-x-4 items-center pl-14"
                  key={index}
                >
                  <div>
                    {month.toLocaleString('default', { month: 'long' })}
                  </div>
                  <div> {monthEntry.amount} </div>
                </div>
              )
            })}
          </div>
        </div>
        <div>{renderPocketMoneyInputs()}</div>
      </div>
    </div>
  )
}

export default PocketMoney
