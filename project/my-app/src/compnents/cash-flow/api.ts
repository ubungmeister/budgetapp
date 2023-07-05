import axios from 'axios'

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
    console.log('goals: ', goals)
    return goals.data
  } catch (error) {
    console.log(error)
  }
}
