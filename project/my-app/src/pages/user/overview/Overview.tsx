import { useEffect, useState } from 'react';

import OverviewPeroformance from '../../../compnents/_basic/library/charts/Performance';
import PieChart from '../../../compnents/_basic/library/charts/PieChart';
import { TaskProps } from '../../../compnents/tasks/types';
import OverviewControls from '../../../compnents/user-overview/OverviewControls';
import OverviewHeaders from '../../../compnents/user-overview/OverviewHeaders';
import { UseAuthUser } from '../../../hooks/UseAuth';
import { useMonthChange } from '../../../hooks/UseMonthChange';
import {
  useCashFlow,
  useGoalsUsers,
  usePocketMoney,
  useTasksUsers,
} from '../../../hooks/UseQueries';

const Overview = () => {
  UseAuthUser();

  const [isMonthChange, setIsMonthChange] = useState('');
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // catch the month change
  useMonthChange({
    currentMonth,
    setCurrentMonth,
    isMonthChange,
    setIsMonthChange,
  });

  const previousMonth = new Date(currentMonth || new Date());
  previousMonth.setMonth(previousMonth.getMonth() - 1);

  const { data: pocketMoneyCurrent } = usePocketMoney(
    'pocketMoney',
    currentMonth
  );
  const { data: pocketMoneyPreviousMonth } = usePocketMoney(
    'pocketMoney',
    previousMonth
  );
  const { data: cashFlow } = useCashFlow('cashFlow', currentMonth);

  const { data: cashFlowPreviousMonth } = useCashFlow(
    'cashFlow',
    previousMonth
  );
  const { data: tasks } = useTasksUsers('tasks', currentMonth);
  const { data: goals } = useGoalsUsers();

  const filteredTasks = tasks?.filter(
    (task: TaskProps) => task.status === 'APPROVED'
  );

  return (
    <div className="pt-8 pl-6 space-y-3">
      <OverviewControls
        setIsMonthChange={setIsMonthChange}
        month={pocketMoneyCurrent?.month || null}
      />
      <div className="px-5 pt-2">
        <hr />
      </div>
      <OverviewHeaders
        cashFlow={cashFlow || []}
        previousMonthCashFlow={cashFlowPreviousMonth || []}
        pocketMoney={pocketMoneyCurrent}
        previousMonthPocketMoney={pocketMoneyPreviousMonth}
        tasks={filteredTasks || []}
      />
      <div className="felex flex-row space-x-10 pt-2 flex px-5">
        <OverviewPeroformance goals={goals || []} />
        <PieChart
          cashFlow={cashFlow || []}
          pocketMoney={pocketMoneyCurrent?.amount || 0}
        />
      </div>
    </div>
  );
};

export default Overview;
