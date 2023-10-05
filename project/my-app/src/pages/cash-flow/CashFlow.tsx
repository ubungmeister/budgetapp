import { useEffect, useState } from 'react';

import CashFlowControls from '../../compnents/cash-flow/CashFlowControls';
import CashFlowForm from '../../compnents/cash-flow/CashFlowForm';
import CashFlowHeader from '../../compnents/cash-flow/CashFlowHeader';
import CashFlowList from '../../compnents/cash-flow/CashFlowList';
import { getCashFlow } from '../../compnents/cash-flow/api';
import { CashFlowProps } from '../../compnents/cash-flow/types';
import { getPocketMoneyUser } from '../../compnents/pocket-money/api';
import { PmType } from '../../compnents/pocket-money/types';
import { UseAuthUser } from '../../hooks/UseAuth';

const CashFlow = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isMonthChange, setIsMonthChange] = useState('');
  const [pocketMoney, setPocketMoney] = useState<PmType | undefined>();
  const [formOpen, setFormOpen] = useState(false);
  const [cashFlowDeleted, setCashFlowDeleted] = useState(false);
  const [cashFlow, setCashFlow] = useState<Array<CashFlowProps>>([]);
  const [selectedCashFlow, setSelectedCashFlow] =
    useState<CashFlowProps | null>(null);

  UseAuthUser();
  const userID = window.localStorage.getItem('userID');

  useEffect(() => {
    if (!userID) return;

    const date = new Date(currentMonth || new Date());

    if (isMonthChange) {
      if (isMonthChange === 'next') {
        date.setMonth(date.getMonth() + 1);
        setCurrentMonth(date);
      } else {
        date.setMonth(date.getMonth() - 1);
        setCurrentMonth(date);
      }
    }
    setIsMonthChange('');
    const fetchData = async () => {
      const pocketMoney = await getPocketMoneyUser(userID, date);
      const data = await pocketMoney?.data.pocketMoney;
      //bug here
      if (!data) {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;

        const newDate = new Date(year, month, 1);
        newDate.setUTCHours(0, 0, 0, 0);

        setPocketMoney({
          amount: 0,
          month: newDate,
          userId: userID as string,
        });
      } else {
        setPocketMoney({
          id: data.id,
          amount: data.amount,
          month: new Date(data.month),
          userId: data.userId,
        });
      }

      const cashFlow = await getCashFlow(userID, date);
      // const cashFlowData = await cashFlow
      setCashFlow(cashFlow || []);
      setCashFlowDeleted(false);
    };

    fetchData();
  }, [isMonthChange, formOpen, cashFlowDeleted]);

  return (
    <div className="pt-8 pl-6 space-y-3 ">
      <CashFlowControls
        setIsMonthChange={setIsMonthChange}
        pocketMoney={pocketMoney}
        setFormOpen={setFormOpen}
        setSelectedCashFlow={setSelectedCashFlow}
      />
      <div className="px-5 pt-2">
        <hr />
      </div>
      <CashFlowHeader cashFlow={cashFlow} pocketMoney={pocketMoney} />

      <div className="flex flex-row space-x-10 pt-3">
        <CashFlowList
          setFormOpen={setFormOpen}
          cashFlow={cashFlow}
          setSelectedCashFlow={setSelectedCashFlow}
          selectedCashFlow={selectedCashFlow}
          setCashFlowDeleted={setCashFlowDeleted}
        />
        {formOpen && (
          <CashFlowForm
            setFormOpen={setFormOpen}
            formOpen={formOpen}
            selectedCashFlow={selectedCashFlow}
            cashFlow={cashFlow}
            pocketMoney={pocketMoney}
          />
        )}
      </div>
    </div>
  );
};

export default CashFlow;
