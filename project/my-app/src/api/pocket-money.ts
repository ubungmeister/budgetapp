import axios from 'axios';

import { PmType } from '../compnents/pocket-money/types';

export const editPocketMoney = async (pocketMoney: Array<PmType>) => {
  try {
    const result = await axios.post(
      `http://localhost:1000/pocketmoney/add-pocket-money`,
      {
        pocketMoney,
        userID: window.localStorage.getItem('userID') as string,
      }
    );

    return result.status;
  } catch (error) {
    console.error(error);
  }
};

export const getPocketMoneyData = async (date: Date) => {
  const pocketMoney = await axios.get(
    'http://localhost:1000/pocketmoney/get-pocket-money',
    {
      params: {
        monthYear: date,
        userID: window.localStorage.getItem('userID'),
      },
    }
  );
  return pocketMoney.data.pocketMoney;
};

export const getPocketMoneyForUser = async (date: Date) => {
  try {
    const result = await axios.get(
      'http://localhost:1000/pocketmoney/get-pocket-money-user',
      {
        params: {
          monthYear: date,
          userID: window.localStorage.getItem('userID'),
        },
      }
    );
    // if null or undefined return 0
    if (
      result.data.pocketMoney === null ||
      result.data.pocketMoney === undefined
    ) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const newDate = new Date(year, month, 1);
      newDate.setUTCHours(0, 0, 0, 0);
      return {
        amount: 0,
        month: newDate,
        userId: window.localStorage.getItem('userID') as string,
      };
    } else {
      return {
        ...result.data.pocketMoney,
        month: new Date(result.data.pocketMoney.month),
      };
    }
  } catch (error) {
    return 0;
  }
};
