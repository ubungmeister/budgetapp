import axios from 'axios';

export const getCashFamilyCashFlow = async (date: Date) => {
  const userID = window.localStorage.getItem('userID');

  const res = await axios.get(
    'http://localhost:1000/cashflow/get-cash-flow-family',
    {
      params: {
        monthYear: date,
        userID,
      },
    }
  );
  return res.data;
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
