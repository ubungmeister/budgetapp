import { useEffect, useState } from 'react';

import { getAllGoals } from '../../../api/goals';
import AddItemControls from '../../../compnents/_basic/library/controls/AddItemControls';
import ItemsList from '../../../compnents/_basic/library/list/ItemsList';
import GoalsForm from '../../../compnents/goals/GoalsForm';
import { GoalProps } from '../../../compnents/goals/types';
import { UseAuthUser } from '../../../hooks/UseAuth';

const Goals = () => {
  const userID = window.localStorage.getItem('userID');
  const [goals, setGoals] = useState<GoalProps[]>([]);
  const [filteredGoals, setFilteredGoals] = useState<GoalProps[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [selectedGoal, setSelectedGoal] = useState<GoalProps | null>(null);
  UseAuthUser();

  useEffect(() => {
    if (!userID) return;
    const fetchData = async () => {
      const data = await getAllGoals();
      setGoals(data);
    };
    fetchData();
  }, [formOpen, goals]);

  useEffect(() => {
    if (search === '') {
      setFilteredGoals(goals); // Reset filtered users to original list
      return;
    }
    const filteredGoals = goals.filter((goal) => {
      return goal.name.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredGoals(filteredGoals);
  }, [search, goals, isActive]);

  //filter goals by active or inactive status
  const activeGoals = isActive
    ? filteredGoals.filter((goal) => goal.isActive)
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
