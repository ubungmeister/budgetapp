import { useEffect, useState } from 'react';

import CashFlowControls from '../../../compnents/cash-flow/CashFlowControls';
import CashFlowForm from '../../../compnents/cash-flow/CashFlowForm';
import CashFlowHeader from '../../../compnents/cash-flow/CashFlowHeader';
import CashFlowList from '../../../compnents/cash-flow/CashFlowList';
import { CashFlowProps } from '../../../compnents/cash-flow/types';
import { UseAuthUser } from '../../../hooks/UseAuth';
import { useCashFlow, usePocketMoney } from '../../../hooks/UseQueries';

const CashFlow = () => {
  UseAuthUser();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isMonthChange, setIsMonthChange] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [cashFlowDeleted, setCashFlowDeleted] = useState(false);
  const [selectedCashFlow, setSelectedCashFlow] =
    useState<CashFlowProps | null>(null);

  const { data: pocketMoneyUser } = usePocketMoney('pocketMoney', currentMonth);

  const { data: cashFlow } = useCashFlow('cashFlow', currentMonth);

  useEffect(() => {
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
  }, [isMonthChange, formOpen, cashFlowDeleted]);

  return (
    <div className="pt-8 pl-6 space-y-3 ">
      <CashFlowControls
        setIsMonthChange={setIsMonthChange}
        pocketMoney={pocketMoneyUser}
        setFormOpen={setFormOpen}
        setSelectedCashFlow={setSelectedCashFlow}
      />
      <div className="px-5 pt-2">
        <hr />
      </div>
      <CashFlowHeader cashFlow={cashFlow || []} pocketMoney={pocketMoneyUser} />

      <div className="flex flex-row space-x-10 pt-3">
        <CashFlowList
          setFormOpen={setFormOpen}
          cashFlow={cashFlow || []}
          setSelectedCashFlow={setSelectedCashFlow}
          selectedCashFlow={selectedCashFlow}
        />
        {formOpen && (
          <CashFlowForm
            setFormOpen={setFormOpen}
            formOpen={formOpen}
            selectedCashFlow={selectedCashFlow}
            cashFlow={cashFlow || []}
            pocketMoney={pocketMoneyUser}
            setCashFlowDeleted={setCashFlowDeleted}
          />
        )}
      </div>
    </div>
  );
};

export default CashFlow;
