import React, { useEffect, useState } from 'react'
import CfControls from '../../compnents/cash-flow/CfControls'
import { PmType } from '../../compnents/pocket-money/types'
import { CashFlowProps } from '../../compnents/cash-flow/types'
import CfList from '../../compnents/cash-flow/CfList'
import CfForm from '../../compnents/cash-flow/CfForm'
import { getPocketMoneyUser } from '../../compnents/pocket-money/api'
import { getCashFlow } from '../../compnents/cash-flow/api'
import CfHeader from '../../compnents/cash-flow/CfHeader'

const CashFlow = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [isMonthChange, setIsMonthChange] = useState('')
  const [pocketMoney, setPocketMoney] = useState<PmType | undefined>()
  const [formOpen, setFormOpen] = useState(false)
  const [cashFlowDeleted, setCashFlowDeleted] = useState(false)
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
      const pocketMoney = await getPocketMoneyUser(userID, date)
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
      setCashFlowDeleted(false)
    }

    fetchData()
  }, [isMonthChange, formOpen, cashFlowDeleted])

  return (
    <div className="pt-8 pl-6 space-y-3 ">
      <CfControls
        setIsMonthChange={setIsMonthChange}
        pocketMoney={pocketMoney}
        setFormOpen={setFormOpen}
        setSelectedCashFlow={setSelectedCashFlow}
      />
      <div className="px-5 pt-2">
        <hr />
      </div>
      <CfHeader cashFlow={cashFlow} pocketMoney={pocketMoney} />
      {formOpen && (
        <CfForm
          setFormOpen={setFormOpen}
          formOpen={formOpen}
          selectedCashFlow={selectedCashFlow}
          cashFlow={cashFlow}
          pocketMoney={pocketMoney}
        />
      )}
      <CfList
        setFormOpen={setFormOpen}
        cashFlow={cashFlow}
        setSelectedCashFlow={setSelectedCashFlow}
        selectedCashFlow={selectedCashFlow}
        setCashFlowDeleted={setCashFlowDeleted}
      />
    </div>
  )
}

export default CashFlow
