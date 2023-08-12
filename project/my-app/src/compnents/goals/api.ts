import axios from 'axios'
import { GoalProps } from './types'

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

export const createGoal = async (data: GoalProps) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/savinggoal/add-goal',
      data
    )
    return result
  } catch (error) {
    console.log(error)
  }
}

export const updateGoal = async (data: GoalProps) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/savinggoal/update-goal',
      data
    )
    return result
  } catch (error) {
    console.log(error)
  }
}

export const deleteGoal = async (id: string) => {
  try {
    const result = await axios.post(
      'http://localhost:1000/savinggoal/delete-goal',
      {
        id,
        userId: window.localStorage.getItem('userID') || '',
      }
    )
    return result
  } catch (error) {
    console.log(error)
  }
}
