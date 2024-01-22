import axios from 'axios';

import { CashFlowProps } from '../compnents/cash-flow/types';



export const getCashFlow = async (userID: string, date: Date) => {
  try {
    const result = await axios.get(
      `http://38.180.48.116/cashflow/get-cash-flow`,
      {
        params: {
          monthYear: date,
          userID,
        },
      }
    );
    return result.data.cashFlow;
  } catch (error) {
    console.error(error);
  }
};

export const getCashFlowForUsers = async (date: Date) => {
  const result = await axios.get(
    `http://38.180.48.116/cashflow/get-cash-flow`,
    {
      params: {
        monthYear: date,
        userID: window.localStorage.getItem('userID'),
      },
    }
  );
  return result.data.cashFlow;
};

export const editCashFlow = async (data: CashFlowProps) => {
  try {
    const result = await axios.post(
      `http://38.180.48.116/cashflow/edit-cash-flow`,
      data
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCashFlow = async (id: string) => {
  try {
    const result = await axios.delete(
      `http://38.180.48.116/cashflow/delete-cash-flow`,
      { data: { id } }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getCashFamilyCashFlow = async (date: Date) => {
  const userID = window.localStorage.getItem('userID');

  const res = await axios.get(
    `http://38.180.48.116/cashflow/get-cash-flow-family`,
    {
      params: {
        monthYear: date,
        userID,
      },
    }
  );
  return res.data;
};

// keep this api call in cash-flow.ts beacuse the api call is related to cash-flow

export const updateGoals = async (data: CashFlowProps) => {
  try {
    const response = await axios.post(
      `http://38.180.48.116/savinggoal/update-goal-amount`,
      data
    );
    return { success: true, response: response };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Error status:', error.response?.status); // Log the error status
      return { success: false, error: error.response };
    }
    console.error('An unexpected error occurred:', error);
    return { success: false, error: null };
  }
};
