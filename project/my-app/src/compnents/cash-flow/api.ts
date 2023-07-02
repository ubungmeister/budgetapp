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