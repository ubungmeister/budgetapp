import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import AddItemControls from '../../../compnents/_basic/library/controls/AddItemControls';
import ItemsList from '../../../compnents/_basic/library/list/ItemsList';
import GoalsForm from '../../../compnents/goals/GoalsForm';
import { GoalProps } from '../../../compnents/goals/types';
import { UseAuthUser } from '../../../hooks/UseAuth';
import { useGoalsUsers } from '../../../hooks/UseQueryAdmin';

const Goals = () => {
  UseAuthUser();
  const [isActive, setIsActive] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<GoalProps | null>(null);

  const { data: goals } = useGoalsUsers();
  const queryClient = useQueryClient();

  const filteredGoals = goals?.filter((goal) => {
    return goal.name.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    queryClient.invalidateQueries(['goals']);
  }, [formOpen]);

  //filter goals by active or inactive status
  const activeGoals = isActive
    ? filteredGoals?.filter((goal) => goal.isActive)
    : filteredGoals;

  return (
    <div className="pt-8 pl-6 space-y-3">
      <AddItemControls
        setIsActive={setIsActive}
        isActive={isActive}
        setFormOpen={setFormOpen}
        setSelectedGoal={setSelectedGoal}
      />
      <div className="px-5 pt-2">
        <hr />
      </div>
      <div className="flex flex-row pt-4 space-x-5">
        <ItemsList
          items={activeGoals}
          setSelectedItem={setSelectedGoal}
          setFormOpen={setFormOpen}
          setSearch={setSearch}
          itemName={'Goals'}
        />
        <GoalsForm
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectedGoal={selectedGoal}
        />
      </div>
    </div>
  );
};

export default Goals;
