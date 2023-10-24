import axios from 'axios';

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
