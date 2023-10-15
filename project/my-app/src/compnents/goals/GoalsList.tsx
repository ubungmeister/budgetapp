import ListItems from '../_basic/library/list-items/ListItems';
import SearchBox from '../_basic/library/search-box/SearchBox';
import { createCashFlow } from '../cash-flow/api';
import { deleteGoal } from './api';
import { GoalListProps, GoalProps } from './types';

const GoalsList = ({
  goals,
  setSelectedGoal,
  setFormOpen,
  setSearch,
}: GoalListProps) => {
  const onGoalSelect = (goal: GoalProps) => {
    setSelectedGoal(goal);
    setFormOpen(true);
  };

  const onGoalDelete = async (goal: GoalProps) => {
    const result = await deleteGoal(goal.id || '');

    if (result?.status === 400) {
      return;
    }

    // after deleting Goal send saved money to cash flow as income
    // money will be saved in cash flow as refund and user won't be able to edit it
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

  const selectedUserHandler = (goal: GoalProps) => {
    setSelectedGoal(goal);
    setFormOpen(true);
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  return (
    <div className=" pl-10 flex flex-col">
      <p className="text-[16px] py-2">
        <span className="text-green-700	">{goals.length}</span> Goals found
      </p>
      <SearchBox onSearch={handleSearch} />

      <ListItems
        listOfItems={goals}
        selectedItemHandler={selectedUserHandler}
      />
    </div>
  );
};

export default GoalsList;
