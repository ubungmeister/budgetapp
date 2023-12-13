import { useEffect } from 'react';

import { getSixMonths } from '../compnents/_basic/helpers/utils';

type Props = {
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  isMonthChange: string;
  setIsMonthChange: React.Dispatch<React.SetStateAction<string>>;
  setMonthArray?: React.Dispatch<React.SetStateAction<Date[]>>;
  formOpen?: boolean;
  cashFlowDeleted?: boolean;
};

export const useMonthChange = ({
  currentMonth,
  setCurrentMonth,
  isMonthChange,
  setIsMonthChange,
  setMonthArray,
  formOpen,
  cashFlowDeleted,
}: Props) => {
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
    // gettting the six months from the current month
    const monthArray = getSixMonths(currentMonth);
    if (setMonthArray) {
      setMonthArray(monthArray);
    }
    setIsMonthChange('');
  }, [isMonthChange, formOpen, cashFlowDeleted]);
};
