import axios from 'axios'
import { BudgetData } from './types'
export const updateBudgets = async (
  monthsAndBudget: Array<BudgetData>,
  userID: string
) => {
  try {
    const result = await axios.post(
      `http://localhost:1000/budget/update-budget`,
      {
        budget: monthsAndBudget,
        userID,
      }
    )
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}
