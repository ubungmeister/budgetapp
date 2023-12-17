import { useEffect, useMemo, useState } from 'react';

import { editPocketMoney } from '../../../api/pocket-money';
import HeaderControls from '../../../compnents/_basic/library/controls/HeaderControls';
import { BudgetData } from '../../../compnents/budget/types';
import PmTable from '../../../compnents/pocket-money/PmTable';
import { PmType } from '../../../compnents/pocket-money/types';
import { UseAuth } from '../../../hooks/UseAuth';
import { useMonthChange } from '../../../hooks/UseMonthChange';
import { useUsers } from '../../../hooks/UseQueries';
import { useAdminBudget, useAdminPocketMoney } from '../../../hooks/UseQueries';

const PocketMoney = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isMonthChange, setIsMonthChange] = useState('');
  const [monthsAndBudget, setMonthsAndBudget] = useState<Array<BudgetData>>([]);
  const [pocketMoney, setPocketMoney] = useState<Array<PmType>>([]);
  const [isChangeCancel, setChangeCancel] = useState<boolean>(false);
  const [saveDiasbled, setSaveDisabled] = useState<boolean>(false);
  const [sussessAlert, setSuccessAlert] = useState<boolean>(false);
  const [monthArray, setMonthArray] = useState<Date[]>([]); // [currentMonth, nextMonth, nextNextMonth, ..

  UseAuth();

  const { data: users } = useUsers();

  const { data: budget } = useAdminBudget('budget', currentMonth);
  const { data: pocketMoneyData } = useAdminPocketMoney(
    'pocketMoney',
    currentMonth
  );

  // defiune the current month and the next 5 months on month change
  useMonthChange({
    currentMonth,
    setCurrentMonth,
    isMonthChange,
    setIsMonthChange,
    setMonthArray,
  });

  // compare months in monthArray and result.data, if there a month in monthArray that is not in result.data, then create an object contains that date and amount 0
  const monthsAndBudgetArray = useMemo(() => {
    const computedArray = [] as Array<any>;
    for (let i = 0; i < monthArray.length; i++) {
      const date = monthArray[i];
      const found = budget?.find((item: any) => item.month === date);
      if (!found) {
        computedArray.push({ month: date, amount: 0 });
      } else {
        computedArray.push(found);
      }
    }
    return computedArray;
  }, [monthArray, budget]);

  // set the monthsAndBudgetArray to monthsAndBudget
  useEffect(() => {
    setMonthsAndBudget(monthsAndBudgetArray);
  }, [monthsAndBudgetArray]);

  // set the pocketMoneyData to pocketMoney
  useEffect(() => {
    setPocketMoney(pocketMoneyData || []);
  }, [pocketMoneyData]);

  const handleSave = async () => {
    const result = await editPocketMoney(pocketMoney);
    if (result === 200) {
      setSuccessAlert(true);
    }
  };

  return (
    <div>
      <div className="pt-8 pl-6 space-y-3">
        <HeaderControls
          setIsMonthChange={setIsMonthChange}
          handleSave={handleSave}
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
          users={users || []}
          setPocketMoney={setPocketMoney}
          setSaveDisabled={setSaveDisabled}
          setSuccessAlert={setSuccessAlert}
        />
      </div>
    </div>
  );
};

export default PocketMoney;
