import { useEffect, useState } from 'react'
import PmControls from '../../compnents/pocket-money/PmControls'
import { PmType } from '../../compnents/pocket-money/types'
import { editPocketMoney } from '../../compnents/pocket-money/api'
import { UserData } from '../../compnents/users/types'
import { BudgetData } from '../../compnents/budget/types'
import PmTable from '../../compnents/pocket-money/PmTable'
import { getPocketMoney } from '../../compnents/pocket-money/api'
import { getBudget } from '../../compnents/budget/api'
import { getUsers } from '../../compnents/users/api'

const PocketMoney = () => {
  const [currentMonth, setCurrentMonth] = useState('')
  const [isMonthChange, setIsMonthChange] = useState('')
  const [monthsAndBudget, setMonthsAndBudget] = useState<Array<BudgetData>>([])
  const [pocketMoney, setPocketMoney] = useState<Array<PmType>>([])
  const [isChangeCancel, setChangeCancel] = useState<boolean>(false)
  const [users, setUsers] = useState<Array<UserData>>([])
  const userID = window.localStorage.getItem('userID')
  const [saveDiasbled, setSaveDisabled] = useState<boolean>(false)
  const [sussessAlert, setSuccessAlert] = useState<boolean>(false)
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

        const data = budget?.data.budget

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

      const pocketMoney = await getPocketMoney(userID, date)
      setPocketMoney(pocketMoney?.data.pocketMoney)

      const users = await getUsers()
      setUsers(users)
    }

    getData()

    setIsMonthChange('')
    setChangeCancel(false)
  }, [isMonthChange, isChangeCancel])

  const handleSavePm = async () => {
    if (!userID) return
    const result = await editPocketMoney(pocketMoney, userID)
    if (result === 200) {
      setSuccessAlert(true)
    }
  }

  return (
    <div>
      <div className="pt-8 pl-6 space-y-3">
        <PmControls
          setIsMonthChange={setIsMonthChange}
          handleSavePm={handleSavePm}
          setChangeCancel={setChangeCancel}
          saveDiasbled={saveDiasbled}
          sussessAlert={sussessAlert}
        />
        <div className="px-5 pt-2">
          <hr />
        </div>
        <PmTable
          monthsAndBudget={monthsAndBudget}
          pocketMoney={pocketMoney}
          users={users}
          setPocketMoney={setPocketMoney}
          setSaveDisabled={setSaveDisabled}
          setSuccessAlert={setSuccessAlert}
        />
      </div>
    </div>
  )
}

export default PocketMoney
