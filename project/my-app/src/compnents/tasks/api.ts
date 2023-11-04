import axios from 'axios';

import { TaskProps } from './types';

export const getTasks = async (userID: string) => {
  try {
    const pocketMoney = await axios.get(
      'http://localhost:1000/tasks/get-all-tasks',
      {
        params: {
          userID: userID,
        },
      }
    );
    return pocketMoney;
  } catch (error) {
    console.error(error);
  }
};

export const createTask = async (data: TaskProps) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/tasks/add-task',
      data
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

// export const updateGoal = async (data: GoalProps) => {
//   try {
//     const result = await axios.post(
//       'http://localhost:1000/savinggoal/update-goal',
//       data
//     );
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteGoal = async (id: string) => {
//   try {
//     const result = await axios.post(
//       'http://localhost:1000/savinggoal/delete-goal',
//       {
//         id,
//         userId: window.localStorage.getItem('userID') || '',
//       }
//     );
//     return result;
//   } catch (error) {
//     console.log(error);
//   }
// };
