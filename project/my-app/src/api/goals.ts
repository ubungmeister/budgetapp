import axios from 'axios';

import { GoalProps } from '../compnents/goals/types';

export const getAllGoals = async () => {
  try {
    const goals = await axios.get(
      'http://localhost:1000/savinggoal/get-all-goals',
      {
        params: {
          userID: window.localStorage.getItem('userID'),
        },
      }
    );
    return goals.data;
  } catch (error) {
    console.log(error);
  }
};

export const getGoalsForUsers = async () => {
  const goals = await axios.get(
    'http://localhost:1000/savinggoal/get-all-goals',
    {
      params: {
        userID: window.localStorage.getItem('userID'),
      },
    }
  );
  return goals.data;
};

export const editGoal = async (data: GoalProps) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/savinggoal/edit-goal',
      data
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGoal = async (id: string) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/savinggoal/delete-goal',
      {
        id,
        userId: window.localStorage.getItem('userID') || '',
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getAllFamilyGoals = async (month: Date) => {
  const res = await axios.get(
    'http://localhost:1000/savinggoal/get-goals-family',
    {
      params: {
        userID: window.localStorage.getItem('userID'),
        monthYear: month,
      },
    }
  );
  return await res.data;
};
