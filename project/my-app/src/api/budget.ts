import axios from 'axios';

import { BudgetData } from '../compnents/budget/types';

export const updateBudgets = async (
  monthsAndBudget: Array<BudgetData>,
  userID: string
) => {
  try {
    const result = await axios.post(
      `http://38.180.48.116/budget/update-budget`,
      {
        budget: monthsAndBudget,
        userID,
      }
    );
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export const getBudget = async (date: Date, userID: string) => {
  try {
    const result = await axios.get(`http://38.180.48.116/budget/get-budget`, {
      params: {
        monthYear: date,
        userID,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getAdminBudget = async (date: Date) => {
  const result = await axios.get(`http://38.180.48.116/budget/get-budget`, {
    params: {
      monthYear: date,
      userID: window.localStorage.getItem('userID'),
    },
  });
  return result.data.budget;
};
