import OverviewControls from '../../compnents/overview/OverviewControls'
import { useState, useEffect } from 'react'
import { PmType } from '../../compnents/pocket-money/types'
import { getPocketMoneyUser } from '../../compnents/pocket-money/api'
import { getCashFlow } from '../../compnents/cash-flow/api'
import { CashFlowProps } from '../../compnents/cash-flow/types'
import OverviewGraph from '../../compnents/overview/OverviewGraph'
const Overview = () => {
  const [isMonthChange, setIsMonthChange] = useState('')
  const [pocketMoney, setPocketMoney] = useState<PmType | undefined>()
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [cashFlow, setCashFlow] = useState<Array<CashFlowProps>>([])

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
    }

    fetchData()
  }, [isMonthChange])

  console.log('cashFlow', cashFlow)

  return (
    <div>
      <div className="items-center justify-center space-y-10">
        <div className="items-center mt-10 ">
          <h1 className="text-center">Overview</h1>
        </div>
        <OverviewControls
          setIsMonthChange={setIsMonthChange}
          pocketMoney={pocketMoney}
        />
        <OverviewGraph cashFlow={cashFlow} pocketMoney={pocketMoney} />
      </div>
    </div>
  )
}

export default Overview
