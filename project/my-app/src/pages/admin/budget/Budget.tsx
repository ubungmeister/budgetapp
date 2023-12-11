import { useEffect, useMemo, useState } from 'react';

import { updateBudgets } from '../../../api/budget';
import { getSixMonths } from '../../../compnents/_basic/helpers/utils';
import HeaderControls from '../../../compnents/_basic/library/controls/HeaderControls';
import BudgetTable from '../../../compnents/budget/BudgetTable';
import { BudgetData } from '../../../compnents/budget/types';
import { UseAuth } from '../../../hooks/UseAuth';
import { useAdminBudget } from '../../../hooks/UseQueries';

const Budget = () => {
  UseAuth();

  const [isMonthChange, setIsMonthChange] = useState('');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [monthsAndBudget, setMonthsAndBudget] = useState<Array<BudgetData>>([]);
  const [isChangeCancel, setChangeCancel] = useState<boolean>(false);

  const userID = window.localStorage.getItem('userID');

  const { data: budget } = useAdminBudget('budget', currentMonth);

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
  }, [isMonthChange, isChangeCancel]);

  const handleSave = async () => {
    if (!userID) return;
    await updateBudgets(monthsAndBudget, userID);
  };

  return (
    <div>
      <div className="pt-8 pl-6 space-y-3">
        <HeaderControls
          setIsMonthChange={setIsMonthChange}
          handleSave={handleSave}
          setChangeCancel={setChangeCancel}
          saveDiasbled={false}
          sussessAlert={false}
        />
        <div className="px-5 pt-2">
          <hr />
        </div>
        <BudgetTable
          monthsAndBudget={monthsAndBudget}
          setMonthsAndBudget={setMonthsAndBudget}
        />
      </div>
    </div>
  );
};

export default Budget;
