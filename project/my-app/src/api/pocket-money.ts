import axios from 'axios';

import { PmType } from '../compnents/pocket-money/types';

export const editPocketMoney = async (
  pocketMoney: Array<PmType>,
  userID: string
) => {
  try {
    const result = await axios.post(
      `http://localhost:1000/pocketmoney/add-pocket-money`,
      {
        pocketMoney,
        userID,
      }
    );

    return result.status;
  } catch (error) {
    console.error(error);
  }
};

export const getPocketMoney = async (userID: string, date: Date) => {
  try {
    const pocketMoney = await axios.get(
      'http://localhost:1000/pocketmoney/get-pocket-money',
      {
        params: {
          monthYear: date,
          userID: userID,
        },
      }
    );
    return pocketMoney;
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

export const getPocketMoneyUser = async (userID: string, date: Date) => {
  try {
    const pocketMoney = await axios.get(
      'http://localhost:1000/pocketmoney/get-pocket-money-user',
      {
        params: {
          monthYear: date,
          userID: userID,
        },
      }
    );
    return pocketMoney;
  } catch (error) {
    console.error(error);
  }
};
