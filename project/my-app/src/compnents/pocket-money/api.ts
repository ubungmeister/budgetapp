import exp from 'constants'
import { PmType } from './types'
import axios from 'axios'
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
    )
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

export const getPocketMoney = async (userID: string, date: Date) => {
  try {
    const pocketMoney = await axios.get(
      'http://localhost:1000/pocketmoney/get-pocket-money-user',
      {
        params: {
          monthYear: date,
          userID,
        },
      }
    )
    return pocketMoney
  } catch (error) {
    console.error(error)
  }
}
