import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
  const [category, setCategory] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [cashFlow, setCashFlow] = useState<Array<CashFlowProps>>([])
  const [selectedCashFlow, setSelectedCashFlow] = useState<CashFlowProps | ''>(
    ''
  )
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalSpendings, setTotalSpendings] = useState(0)

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
      console.log('data', data)
      //bug here
      if (!data) {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth() + 1

        const newDate = new Date(year, month, 1)
        newDate.setUTCHours(0, 0, 0, 0)

        const formattedDate = newDate.toISOString()
        console.log('formattedDate', formattedDate)

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
  }, [isMonthChange])

  return (
    <div className="space-y-10 ">
      <CfControls
        setIsMonthChange={setIsMonthChange}
        pocketMoney={pocketMoney}
      />
      <div className="flex flex-row justify-center space-x-20">
        <div>
          <div>Pocket money: {pocketMoney?.amount || 0}</div>
          <div>Other income: </div>
          <div>Total income:</div>
        </div>
        <div>
          <div>Spendings:</div>
          <div>Savings on goals:</div>
          <div>Total spendings:</div>
        </div>
        {formOpen && (
          <CfForm
            setFormOpen={setFormOpen}
            formOpen={formOpen}
            category={category}
            setCategory={setCategory}
          />
        )}
        <div onClick={() => setFormOpen(true)}>Add +</div>
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
