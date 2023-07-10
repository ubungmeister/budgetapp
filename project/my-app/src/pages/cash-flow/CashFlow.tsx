import React, { useEffect, useState } from 'react'
import CfControls from '../../compnents/cash-flow/CfControls'
import { PmType } from '../../compnents/pocket-money/types'
import { CashFlowProps } from '../../compnents/cash-flow/types'
import CfList from '../../compnents/cash-flow/CfList'
import CfForm from '../../compnents/cash-flow/CfForm'
import { getPocketMoney } from '../../compnents/pocket-money/api'
import { getCashFlow } from '../../compnents/cash-flow/api'

const CashFlow = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [isMonthChange, setIsMonthChange] = useState('')
  const [pocketMoney, setPocketMoney] = useState<PmType | undefined>()
  const [formOpen, setFormOpen] = useState(false)
  const [cashFlow, setCashFlow] = useState<Array<CashFlowProps>>([])
  const [selectedCashFlow, setSelectedCashFlow] =
    useState<CashFlowProps | null>(null)

  const userID = window.localStorage.getItem('userID')

  useEffect(() => {
    if (!userID) return

    const date = new Date(currentMonth || new Date())

    if (isMonthChange) {
      if (isMonthChange === 'next') {
        date.setMonth(date.getMonth() + 1)
        setCurrentMonth(date)
      } else {
        date.setMonth(date.getMonth() - 1)
        setCurrentMonth(date)
      }
    }
    setIsMonthChange('')
    const fetchData = async () => {
      const pocketMoney = await getPocketMoney(userID, date)
      const data = await pocketMoney?.data.pocketMoney
      //bug here
      if (!data) {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth() + 1

        const newDate = new Date(year, month, 1)
        newDate.setUTCHours(0, 0, 0, 0)

        setPocketMoney({
          amount: 0,
          month: newDate,
          userId: userID as string,
        })
      } else {
        setPocketMoney({
          id: data.id,
          amount: data.amount,
          month: new Date(data.month),
          userId: data.userId,
        })
      }

      const cashFlow = await getCashFlow(userID, date)
      // const cashFlowData = await cashFlow
      setCashFlow(cashFlow || [])
    }

    fetchData()
  }, [isMonthChange, formOpen])

  const formatDecimals = (item: number) => {
    return Number(item.toFixed(2))
  }

  const amounts = cashFlow.map(item => item.amount)

  const expense = formatDecimals(
    amounts.filter(el => el < 0).reduce((acc, el) => acc + el, 0)
  )
  const income = formatDecimals(
    amounts.filter(el => el > 0).reduce((acc, el) => acc + el, 0)
  )
  const otherIncome = income - (pocketMoney?.amount || 0)

  const total = formatDecimals(Number(income) - Number(-expense))

  return (
    <div className="space-y-10 ">
      <CfControls
        setIsMonthChange={setIsMonthChange}
        pocketMoney={pocketMoney}
      />
      <div className="flex flex-row justify-center space-x-20">
        <div>
          <div>Pocket money: {pocketMoney?.amount || 0}</div>
          <div>Other income: {otherIncome}</div>
          <div>Total income:{income}</div>
        </div>
        <div>
          <div>Spendings:</div>
          <div>Savings on goals:</div>
          <div>Total spendings:{expense}</div>
        </div>
        <div>Total:{total}</div>
        {formOpen && (
          <CfForm
            setFormOpen={setFormOpen}
            formOpen={formOpen}
            selectedCashFlow={selectedCashFlow}
          />
        )}
        <div
          onClick={() => {
            setFormOpen(true)
            setSelectedCashFlow(null)
          }}
        >
          Add +
        </div>
      </div>
      <CfList
        setFormOpen={setFormOpen}
        cashFlow={cashFlow}
        setSelectedCashFlow={setSelectedCashFlow}
        selectedCashFlow={selectedCashFlow}
      />
    </div>
  )
}

export default CashFlow
