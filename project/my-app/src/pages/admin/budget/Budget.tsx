import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { updateBudgets } from '../../../api/budget';
import HeaderControls from '../../../compnents/_basic/library/controls/HeaderControls';
import BudgetTable from '../../../compnents/budget/BudgetTable';
import { BudgetData } from '../../../compnents/budget/types';
import { UseAuth } from '../../../hooks/UseAuth';
import { useMonthChange } from '../../../hooks/UseMonthChange';
import { useAdminBudget } from '../../../hooks/UseQueries';

const Budget = () => {
  UseAuth();

  const [isMonthChange, setIsMonthChange] = useState('');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [monthsAndBudget, setMonthsAndBudget] = useState<Array<BudgetData>>([]);
  const [monthArray, setMonthArray] = useState<Date[]>([]); // [currentMonth, nextMonth, nextNextMonth, ..
  const [isChangeCancel, setChangeCancel] = useState<boolean>(false);

  const userID = window.localStorage.getItem('userID');

  const { data: budget } = useAdminBudget('budget', currentMonth);

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

  const handleSave = async () => {
    if (!userID) return;
    const result = await updateBudgets(monthsAndBudget, userID);
    if (result?.status === 200) {
      toast.success('Budget updated');
    } else {
      toast.error('Error updating budget');
    }
  };

  return (
    <div>
      {/* <div className="pt-8 pl-6 space-y-3"> */}
      <HeaderControls
        setIsMonthChange={setIsMonthChange}
        handleSave={handleSave}
        setChangeCancel={setChangeCancel}
        saveDiasbled={false}
        sussessAlert={false}
      />
      <div className="hr">
        <hr />
      </div>
      <BudgetTable
        monthsAndBudget={monthsAndBudget}
        setMonthsAndBudget={setMonthsAndBudget}
      />
    </div>
    // </div>
  );
};

export default Budget;
