import axios from 'axios'
import { CashFlowProps } from './types'

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
    )
    return result.data.cashFlow
  } catch (error) {
    console.error(error)
  }
}

export const getAllGoals = async () => {
  try {
    const goals = await axios.get(
      'http://localhost:1000/savinggoal/get-all-goals',
      {
        params: {
          userID: window.localStorage.getItem('userID'),
        },
      }
    )
    return goals.data
  } catch (error) {
    console.log(error)
  }
}

export const updateGoals = async (data: CashFlowProps) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/savinggoal/update-goal-amount',
      data
    )
    return result
  } catch (error) {
    console.log(error)
  }
}

export const createCashFlow = async (data: CashFlowProps) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/cashflow/add-cash-flow',
      data
    )

    return result
  } catch (error) {
    console.log(error)
  }
}

export const updateCashFlow = async (data: CashFlowProps) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/cashflow/update-cash-flow',
      data
    )
    return result
  } catch (error) {
    console.log(error)
  }
}

export const deleteCashFlow = async (id: string) => {
  try {
    const result = await axios.delete(
      'http://localhost:1000/cashflow/delete-cash-flow',
      { data: { id } }
    )
    return result
  } catch (error) {
    console.log(error)
  }
}
