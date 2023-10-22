import axios from 'axios';
import { useEffect } from 'react';

export const getPocketMoney = async (userID: string) => {
  try {
    const pocketMoney = await axios.get(
      'http://localhost:1000/tasks/get-tasks',
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

const MyTasks = () => {
  const userID = window.localStorage.getItem('userID');

  useEffect(() => {
    if (!userID) return;
    console.log('userID, ', userID);
    const getData = async () => {
      const pocketMoney = await getPocketMoney(userID);
      console.log(pocketMoney);
    };
    getData();
  }, []);
  return <div>my task</div>;
};

export default MyTasks;
