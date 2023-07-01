import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CfControls from '../../compnents/cash-flow/CfControls'
import { PmType } from '../../compnents/pocket-money/types'
import { CashFlowProps } from '../../compnents/cash-flow/types'
import CfList from '../../compnents/cash-flow/CfList'
import CfForm from '../../compnents/cash-flow/CfForm'

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

  console.log('pocketMoney', pocketMoney)
  const userID = window.localStorage.getItem('userID')

  useEffect(() => {
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
      try {
        const result = await axios.get(
          'http://localhost:1000/pocketmoney/get-pocket-money-user',
          {
            params: {
              monthYear: date,
              userID,
            },
          }
        )
        const data = result.data.pocketMoney
        if (!result.data.pocketMoney) {
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
      } catch (error) {}
      try {
        const result = await axios.get(
          'http://localhost:1000/cashflow/get-cash-flow',
          {
            params: {
              monthYear: date,
              userID,
            },
          }
        )
        const data = result.data.cashFlow
        setCashFlow(data)
      } catch (error) {}
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
