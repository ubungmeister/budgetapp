import axios from 'axios';

import { CashFlowProps } from '../cash-flow/types';
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

export const getTasksByMonth = async (userID: string, date: Date) => {
  try {
    const pocketMoney = await axios.get(
      'http://localhost:1000/tasks/get-tasks-month',
      {
        params: {
          monthYear: date,
          userID,
        },
      }
    );
    return pocketMoney;
  } catch (error) {
    console.error(error);
  }
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
