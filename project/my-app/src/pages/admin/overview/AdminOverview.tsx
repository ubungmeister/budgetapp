import { useEffect, useState } from 'react';

import AdminOverviewHeaders from '../../../compnents/admin-overview/AdminOverviewHeaders';
import OverviewControls from '../../../compnents/user-overview/OverviewControls';
import { UseAuth } from '../../../hooks/UseAuth';
import {
  useAdminBudget,
  useAdminCashFlow,
  useAdminGoals,
  useAdminTasks,
} from '../../../hooks/UseQueryAdmin';

const AdminPage = () => {
  UseAuth();

  const [isMonthChange, setIsMonthChange] = useState('');
  const [month, setMonth] = useState<Date>(new Date());

  const previousMonthDate = new Date(month || new Date());
  previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

  const { data: goals } = useAdminGoals('allGoals', month);
  const { data: previousMonthGoals } = useAdminGoals(
    'allGoalsPreviousMonth',
    previousMonthDate
  );
  const { data: cashFlow } = useAdminCashFlow('cashFlow', month);
  const { data: previousMonthCashFlow } = useAdminCashFlow(
    'previousMonthCashFlow',
    previousMonthDate
  );

  const { data: tasks } = useAdminTasks('tasks', month);
  const { data: budget } = useAdminBudget('budget', month);
  console.log('budget', budget);
  useEffect(() => {
    const date = new Date(month || new Date());
    const previousMonthDate = new Date(month || new Date());
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

    if (isMonthChange) {
      if (isMonthChange === 'next') {
        date.setMonth(date.getMonth() + 1);
        setMonth(date);
      } else {
        date.setMonth(date.getMonth() - 1);
        setMonth(date);
      }
    }
    setIsMonthChange('');
  }, [isMonthChange, setIsMonthChange]);

  return (
    <div className="pt-8 pl-6 space-y-3">
      <OverviewControls
        setIsMonthChange={setIsMonthChange}
        month={month || null}
      />
      <div className="px-5 pt-2">
        <hr />
      </div>
      <AdminOverviewHeaders
        cashFlow={cashFlow}
        previousMonthCashFlow={previousMonthCashFlow}
        goals={goals}
        previousMonthGoals={previousMonthGoals}
        tasks={tasks}
      />
    </div>
  );
};
export default AdminPage;
