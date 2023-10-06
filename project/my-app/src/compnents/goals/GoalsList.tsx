import { createCashFlow } from '../cash-flow/api';
import { deleteGoal } from './api';
import { GoalListProps, GoalProps } from './types';

const GoalsList = ({ goals, setSelectedGoal, setFormOpen }: GoalListProps) => {
  const onGoalSelect = (goal: GoalProps) => {
    setSelectedGoal(goal);
    setFormOpen(true);
  };
  const onGoalDelete = async (goal: GoalProps) => {
    const result = await deleteGoal(goal.id || '');

    if (result?.status === 400) {
      return;
    }
    try {
      const formData = {
        amount: goal.currentAmount,
        category: 'Refund',
        saving_goal_Id: '',
        userId: window.localStorage.getItem('userID') || '',
        category_type: 'Income',
        description: 'Refund from goal',
        start_date: new Date(),
      };
      await createCashFlow(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {goals.map((goal) => {
          return (
            <div key={goal.id} className="flex flex-row space-x-5">
              <div>{goal.name}</div>
              <div>{goal.goalAmount}</div>
              <div>{goal.currentAmount}</div>
              <div onClick={() => onGoalSelect(goal)}>Edit goal</div>
              <div onClick={() => onGoalDelete(goal)}>Remove goal</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalsList;
