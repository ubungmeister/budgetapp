import { useEffect, useMemo, useState } from 'react';

import { getBudget } from '../../../api/budget';
import { editPocketMoney } from '../../../api/pocket-money';
import { getUsers } from '../../../api/users';
import { getSixMonths } from '../../../compnents/_basic/helpers/utils';
import HeaderControls from '../../../compnents/_basic/library/controls/HeaderControls';
import { BudgetData } from '../../../compnents/budget/types';
import PmTable from '../../../compnents/pocket-money/PmTable';
import { PmType } from '../../../compnents/pocket-money/types';
import { UserData } from '../../../compnents/users/types';
import { UseAuth } from '../../../hooks/UseAuth';
import { useUsers } from '../../../hooks/UseQueryAdmin';
import {
  useAdminBudget,
  useAdminPocketMoney,
} from '../../../hooks/UseQueryAdmin';

const PocketMoney = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isMonthChange, setIsMonthChange] = useState('');
  const [monthsAndBudget, setMonthsAndBudget] = useState<Array<BudgetData>>([]);
  const [pocketMoney, setPocketMoney] = useState<Array<PmType>>([]);
  const [isChangeCancel, setChangeCancel] = useState<boolean>(false);
  const [saveDiasbled, setSaveDisabled] = useState<boolean>(false);
  const [sussessAlert, setSuccessAlert] = useState<boolean>(false);

  UseAuth();

  const { data: users } = useUsers();

  const { data: budget } = useAdminBudget('budget', currentMonth);
  const { data: pocketMoneyData } = useAdminPocketMoney(
    'pocketMoney',
    currentMonth
  );

  // defiune the current month and the next 5 months
  const monthArray = getSixMonths(currentMonth);

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
    setChangeCancel(false);
  }, [isMonthChange, isChangeCancel]);

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
