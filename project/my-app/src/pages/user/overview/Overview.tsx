import { useEffect, useState } from 'react';

import { getCashFlow } from '../../../compnents/cash-flow/api';
import { CashFlowProps } from '../../../compnents/cash-flow/types';
import { getAllGoals } from '../../../compnents/goals/api';
import { GoalProps } from '../../../compnents/goals/types';
import OverviewControls from '../../../compnents/overview/OverviewControls';
import OverviewGraph from '../../../compnents/overview/OverviewGraph';
import OverviewHeaders from '../../../compnents/overview/OverviewHeaders';
import OverviewPeroformance from '../../../compnents/overview/OverviewPeroformance';
import { getPocketMoneyUser } from '../../../compnents/pocket-money/api';
import { PmType } from '../../../compnents/pocket-money/types';
import { getTasksByMonth } from '../../../compnents/tasks/api';
import { TaskProps } from '../../../compnents/tasks/types';
import { UseAuthUser } from '../../../hooks/UseAuth';

const Overview = () => {
  UseAuthUser();

  const [isMonthChange, setIsMonthChange] = useState('');
  const [pocketMoney, setPocketMoney] = useState<PmType | null>(null);
  const [previousMonthPocketMoney, setPreviousMonthPocketMoney] =
    useState<PmType | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [cashFlow, setCashFlow] = useState<Array<CashFlowProps>>([]);
  const [previousMonthCashFlow, setPreviousMonthCashFlow] = useState<
    Array<CashFlowProps>
  >([]);
  const [goals, setGoals] = useState<Array<GoalProps>>([]);
  const [tasks, setTasks] = useState<Array<TaskProps>>([]);

  const userID = window.localStorage.getItem('userID');

  useEffect(() => {
    if (!userID) return;

    const date = new Date(currentMonth || new Date());
    const previousMonthDate = new Date(currentMonth || new Date());
    previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);

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
    const fetchData = async () => {
      const pocketMoney = await getPocketMoneyUser(userID, date);
      const data = await pocketMoney?.data.pocketMoney;
      //bug here
      if (!data) {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth() + 1;

        const newDate = new Date(year, month, 1);
        newDate.setUTCHours(0, 0, 0, 0);

        setPocketMoney({
          amount: 0,
          month: newDate,
          userId: userID as string,
        });
      } else {
        setPocketMoney({
          id: data.id,
          amount: data.amount,
          month: new Date(data.month),
          userId: data.userId,
        });
      }

      const previousMonthPocketMoney = await getPocketMoneyUser(
        userID,
        previousMonthDate
      );
      const previousMonthData = await previousMonthPocketMoney?.data
        .pocketMoney;
      if (!previousMonthData) {
        const year = previousMonthDate.getFullYear();
        const month = previousMonthDate.getMonth() + 1;

        const newDate = new Date(year, month, 1);
        newDate.setUTCHours(0, 0, 0, 0);

        setPreviousMonthPocketMoney({
          amount: 0,
          month: newDate,
          userId: userID as string,
        });
      } else {
        setPreviousMonthPocketMoney({
          id: previousMonthData.id,
          amount: previousMonthData.amount,
          month: new Date(previousMonthData.month),
          userId: previousMonthData.userId,
        });
      }

      const cashFlow = await getCashFlow(userID, date);
      setCashFlow(cashFlow || []);

      const previousMonthCashFlow = await getCashFlow(
        userID,
        previousMonthDate
      );
      setPreviousMonthCashFlow(previousMonthCashFlow || []);

      const tasks = await getTasksByMonth(userID, date);
      const filteredTasks = tasks?.data.tasks.filter(
        (task: TaskProps) => task.status === 'APPROVED'
      );
      setTasks(filteredTasks);
    };

    fetchData();
  }, [isMonthChange]);

  useEffect(() => {
    const fetchGoals = async () => {
      const data = await getAllGoals();
      setGoals(data || []);
    };
    fetchGoals();
  }, []);

  return (
    <div className="pt-8 pl-6 space-y-3">
      <OverviewControls
        setIsMonthChange={setIsMonthChange}
        pocketMoney={pocketMoney}
      />
      <div className="px-5 pt-2">
        <hr />
      </div>
      <OverviewHeaders
        cashFlow={cashFlow}
        previousMonthCashFlow={previousMonthCashFlow}
        pocketMoney={pocketMoney}
        previousMonthPocketMoney={previousMonthPocketMoney}
        tasks={tasks}
      />
      <div className="felex flex-row space-x-10 pt-2 flex px-5">
        <OverviewPeroformance goals={goals} />
        <OverviewGraph cashFlow={cashFlow} pocketMoney={pocketMoney} />
      </div>
    </div>
  );
};

export default Overview;
