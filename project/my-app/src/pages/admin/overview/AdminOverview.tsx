import { useEffect, useState } from 'react';

import OverviewGraph from '../../../compnents/_basic/library/charts/PieChart';
import AdminOverviewHeaders from '../../../compnents/admin-overview/AdminOverviewHeaders';
import PendingTasks from '../../../compnents/admin-overview/PendingTasks';
import OverviewControls from '../../../compnents/user-overview/OverviewControls';
import { UseAuth } from '../../../hooks/UseAuth';
import {
  useAdminBudget,
  useAdminCashFlow,
  useAdminGoals,
  useAdminPocketMoney,
  useAdminTasks,
  useTasks,
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
  const { data: tasksAllMonths } = useTasks();

  const tasksInProgress = tasksAllMonths?.filter(
    (task) => task.status !== 'APPROVED'
  );

  const { data: budget } = useAdminBudget('budget', month);

  const budgetCurrentMonth = budget?.filter(
    (budget) => new Date(budget.month).getMonth() === month.getMonth()
  );
  const { data: pocketMoney } = useAdminPocketMoney('pocketMoney', month);

  const pocketMoneyCurrentMonth = pocketMoney?.filter(
    (pocketMoney) => new Date(pocketMoney.month).getMonth() === month.getMonth()
  );
  const amountPocketMoney = pocketMoneyCurrentMonth?.map(
    (item) => item.amount
  ) || [0];
  const calculatedPocketMoney = amountPocketMoney.reduce(
    (acc, current) => acc + current,
    0
  );

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
        budget={budgetCurrentMonth}
        pocketMoney={calculatedPocketMoney}
      />
      <div className="felex flex-row space-x-10 pt-2 flex px-5">
        <PendingTasks tasksInProgress={tasksInProgress} />
        <OverviewGraph
          cashFlow={cashFlow || []}
          pocketMoney={calculatedPocketMoney}
        />
      </div>
    </div>
  );
};
export default AdminPage;
