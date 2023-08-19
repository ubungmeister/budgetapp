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

  return (
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
                key={index}
                className="flex flex-col space-x-4 items-center pl-14"
              >
                <div>{month.toLocaleString('default', { month: 'long' })}</div>
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
