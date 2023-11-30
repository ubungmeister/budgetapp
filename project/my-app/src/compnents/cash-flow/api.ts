import axios from 'axios';

import { CashFlowProps } from './types';

export const getCashFlow = async (userID: string, date: Date) => {
  try {
    const result = await axios.get(
      'http://localhost:1000/cashflow/get-cash-flow',
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

// export const getCashFamilyFlow = async (date: Date) => {
//   const userID = window.localStorage.getItem('userID');
//   console.log('userID', userID);
//   try {
//     const result = await axios.get(
//       'http://localhost:1000/cashflow/get-cash-flow-family',
//       {
//         params: {
//           monthYear: date,
//           userID,
//         },
//       }
//     );
//     return result.data.cashFlow;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getCashFamilyFlow = async (date: Date) => {
//   const userID = window.localStorage.getItem('userID');

//   const res = await axios.get(
//     'http://localhost:1000/cashflow/get-cash-flow-family',
//     {
//       params: {
//         monthYear: date,
//         userID,
//       },
//     }
//   );
//   return res.data;
// };

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

export const updateGoals = async (data: CashFlowProps) => {
  try {
    const response = await axios.post(
      'http://localhost:1000/savinggoal/update-goal-amount',
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

export const editCashFlow = async (data: CashFlowProps) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/cashflow/edit-cash-flow',
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
      'http://localhost:1000/cashflow/delete-cash-flow',
      { data: { id } }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
