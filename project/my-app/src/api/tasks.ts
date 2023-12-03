import axios from 'axios';

import { CashFlowProps } from '../compnents/cash-flow/types';
import { TaskProps } from '../compnents/tasks/types';

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

export const getAllTasks = async () => {
  const tasks = await axios.get('http://localhost:1000/tasks/get-all-tasks', {
    params: {
      userID: window.localStorage.getItem('userID') || '',
    },
  });
  return tasks.data.tasks;
};

export const getTasksByMonth = async (userID: string, date: Date) => {
  try {
    const tasks = await axios.get(
      'http://localhost:1000/tasks/get-tasks-month',
      {
        params: {
          monthYear: date,
          userID,
        },
      }
    );
    return tasks;
  } catch (error) {
    console.error(error);
  }
};

export const getAllTasksByMonth = async (date: Date) => {
  const tasks = await axios.get('http://localhost:1000/tasks/get-tasks-month', {
    params: {
      monthYear: date,
      userID: window.localStorage.getItem('userID') || '',
    },
  });
  return tasks.data.tasks;
};

export const editTask = async (data: TaskProps) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/tasks/edit-task',
      data
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const result = await axios.post('http://localhost:1000/tasks/delete-task', {
      id,
      userId: window.localStorage.getItem('userID') || '',
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

// related to tasks and cash flow, keep it here

export const createReward = async (data: CashFlowProps) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/cashflow/add-cash-flow',
      data
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};
