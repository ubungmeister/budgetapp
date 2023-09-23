import { PmTableProps } from './types'
import { v4 as uuidv4 } from 'uuid'

const PmTable = ({
  monthsAndBudget,
  pocketMoney,
  users,
  setPocketMoney,
}: PmTableProps) => {
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
          <div className=" min-w-[8rem] max-w-[8rem] text-center">
            <input
              key={index}
              value={amount}
              type="number"
              min={0}
              max={1000000}
              className=" min-w-[5rem] max-w-[5rem] border-2 border-gray-300 rounded-md p-1"
              onChange={e =>
                handleInputChange(
                  e.target.value,
                  monthEntry.month,
                  user.id,
                  pocketMoneyEntry?.id
                )
              }
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

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

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
            return (
              <div
                key={index}
                className="flex flex-col text-center space-y-2 min-w-[8rem] md:min-w-[10rem] border-x-2 my-4"
              >
                <div className="center items-start">
                  {capitalizeFirstLetter(monthName)}
                </div>
                <div> {monthEntry.amount} </div>
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
