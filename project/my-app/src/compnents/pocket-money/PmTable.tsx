import { PmTableProps, PmGroupedData } from './types'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'

const PmTable = ({
  monthsAndBudget,
  pocketMoney,
  users,
  setPocketMoney,
  setSaveDisabled,
  setSuccessAlert,
}: PmTableProps) => {
  const [groupedData, setGroupedData] = useState<PmGroupedData>({})

  useEffect(() => {
    // Group data by month and year
    const groupData = () => {
      const grouped: PmGroupedData = {}

      pocketMoney.forEach(item => {
        const key = new Date(item.month).toISOString()
        if (grouped[key]) {
          grouped[key] += item.amount
        } else {
          grouped[key] = item.amount
        }
      })

      setGroupedData(grouped)
    }

    groupData()
  }, [pocketMoney])

  const renderPocketMoneyInputs = () => {
    const userInputs = users.map(user => {
      const userPocketMoney = pocketMoney?.filter(
        entry => entry.userId === user.id
      )

      const inputs = monthsAndBudget.map((monthEntry, index) => {
        const pocketMoneyEntry = userPocketMoney.find(
          entry => entry.month === monthEntry.month
        )
        const amount = pocketMoneyEntry ? pocketMoneyEntry.amount : 0

        return (
          <div className="  min-w-[4rem] md:min-w-[7rem] lg:min-w-[10rem] text-center">
            <input
              key={index}
              defaultValue={amount ?? 0}
              value={amount ?? 0}
              type="number"
              min={0}
              max={1000000}
              className=" min-w-[4rem] max-w-[4rem] md:max-w-[5rem] md:min-w-[5rem] border-2 border-gray-300 rounded-md p-1"
              onChange={e => {
                handleInputChange(
                  parseFloat(e.target.value) || 0,
                  monthEntry.month,
                  user.id,
                  pocketMoneyEntry?.id
                )
                setSuccessAlert(false)
              }}
            />
          </div>
        )
      })

      return (
        <div className="flex  flex-row justify-stretch hover:bg-gray-50 py-4">
          <p className="px-5 overflow-x-hidden text-ellipsis min-w-[10rem]">
            {user.username}
          </p>
          <div className="flex flex-row space-x-4 position-center">
            <p className="flex ">{inputs}</p>
          </div>
        </div>
      )
    })
    return userInputs
  }

  const handleInputChange = (
    value: number,
    month: any,
    userId: any,
    pocketMoneyID?: string
  ) => {
    if (pocketMoneyID === undefined) {
      const newPocketMoneyEntry = {
        id: uuidv4(),
        amount: value,
        month,
        userId,
      }
      setPocketMoney([...pocketMoney, newPocketMoneyEntry])
    } else {
      const updatedPocketMoney = pocketMoney.map(entry => {
        if (entry.userId === userId && entry.month === month) {
          return { ...entry, amount: value }
        }
        return entry
      })
      setPocketMoney(updatedPocketMoney)
    }
  }

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  // verify if any month budget is exceeded and disable save button
  const isAnyMonthExceeded = monthsAndBudget.some(monthEntry => {
    const month = new Date(monthEntry.month)
    const spendAmount = groupedData[month.toISOString()]
    return spendAmount > monthEntry.amount
  })

  setSaveDisabled(isAnyMonthExceeded)

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row ">
        <div className="px-5 overflow-x-hidden text-ellipsis min-w-[10rem] max-w-[10rem] space-y-2 my-4">
          <p>Month</p>
          <p>Budget</p>
        </div>
        <div className="flex flex-row ">
          {monthsAndBudget.map((monthEntry, index) => {
            const month = new Date(monthEntry.month)
            const monthName = month.toLocaleString('default', { month: 'long' })
            const spendAmount = groupedData[month.toISOString()]
            return (
              <div
                key={index}
                className="flex flex-col text-center space-y-2 min-w-[4rem] md:min-w-[7rem] lg:min-w-[10rem] border-x-2 my-4"
              >
                <div className="center items-start">
                  {capitalizeFirstLetter(monthName)}
                </div>
                <div>
                  <span
                    className={`${
                      spendAmount > monthEntry.amount && 'text-red-600'
                    }`}
                  >
                    {spendAmount ?? 0}
                  </span>
                  /<span>{monthEntry.amount}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div>{renderPocketMoneyInputs()}</div>
    </div>
  )
}

export default PmTable
