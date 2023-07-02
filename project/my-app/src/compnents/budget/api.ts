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

export const getBudget = async (date: Date, userID: string) => {
  try {
    const result = await axios.get('http://localhost:1000/budget/get-budget', {
      params: {
        monthYear: date,
        userID,
      },
    })
    return result
  } catch (error) {
    console.error(error)
  }
}
