import { useState } from 'react';

import OverviewGraph from '../../../compnents/_basic/library/charts/PieChart';
import AdminOverviewHeaders from '../../../compnents/admin-overview/AdminOverviewHeaders';
import PendingTasks from '../../../compnents/admin-overview/PendingTasks';
import OverviewControls from '../../../compnents/user-overview/OverviewControls';
import { UseAuth } from '../../../hooks/UseAuth';
import { useMonthChange } from '../../../hooks/UseMonthChange';
import {
  useAdminBudget,
  useAdminCashFlow,
  useAdminGoals,
  useAdminPocketMoney,
  useAdminTasks,
  useTasks,
} from '../../../hooks/UseQueries';

const AdminPage = () => {
  UseAuth();

  const [isMonthChange, setIsMonthChange] = useState('');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // catch the month change
  useMonthChange({
    currentMonth,
    setCurrentMonth,
    isMonthChange,
    setIsMonthChange,
  });

  const previousMonthDate = new Date(currentMonth || new Date());
  previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

  const { data: goals } = useAdminGoals('allGoals', currentMonth);
  const { data: previousMonthGoals } = useAdminGoals(
    'allGoalsPreviousMonth',
    previousMonthDate
  );
  const { data: cashFlow } = useAdminCashFlow('cashFlow', currentMonth);
  const { data: previousMonthCashFlow } = useAdminCashFlow(
    'previousMonthCashFlow',
    previousMonthDate
  );

  const { data: tasks } = useAdminTasks('tasks', currentMonth);
  const { data: tasksAllMonths } = useTasks();

  const tasksInProgress = tasksAllMonths?.filter(
    (task) => task.status !== 'APPROVED'
  );

  const { data: budget } = useAdminBudget('budget', currentMonth);

  const budgetCurrentMonth = budget?.filter(
    (budget) => new Date(budget.month).getMonth() === currentMonth.getMonth()
  );
  const { data: pocketMoney } = useAdminPocketMoney(
    'pocketMoney',
    currentMonth
  );

  const pocketMoneyCurrentMonth = pocketMoney?.filter(
    (pocketMoney) =>
      new Date(pocketMoney.month).getMonth() === currentMonth.getMonth()
  );
  const amountPocketMoney = pocketMoneyCurrentMonth?.map(
    (item) => item.amount
  ) || [0];
  const calculatedPocketMoney = amountPocketMoney.reduce(
    (acc, current) => acc + current,
    0
  );

  return (
    <div className="pt-8 pl-6 space-y-3">
      <OverviewControls
        setIsMonthChange={setIsMonthChange}
        month={currentMonth || null}
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
