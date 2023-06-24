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
