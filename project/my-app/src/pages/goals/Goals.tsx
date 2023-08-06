import { useEffect, useState } from 'react'
import { GoalProps } from '../../compnents/goals/types'
import { getAllGoals } from '../../compnents/goals/api'
import GoalsList from '../../compnents/goals/GoalsList'
import GoalsForm from '../../compnents/goals/GoalsForm'
import GoalsControls from '../../compnents/goals/GoalsControls'
const Goals = () => {
  const userID = window.localStorage.getItem('userID')
  const [goals, setGoals] = useState<GoalProps[]>([])
  const [isActive, setIsActive] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<GoalProps | null>(null)

  useEffect(() => {
    if (!userID) return
    const fetchData = async () => {
      const data = await getAllGoals()
      setGoals(data)
    }
    fetchData()
  }, [formOpen])

  const filteredGoals = isActive ? goals.filter(goal => goal.isActive) : goals

  return (
    <div>
      <GoalsControls
        setIsActive={setIsActive}
        isActive={isActive}
        setFormOpen={setFormOpen}
        setSelectedGoal={setSelectedGoal}
      />
      {formOpen && (
        <GoalsForm
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectedGoal={selectedGoal}
        />
      )}
      <GoalsList
        goals={filteredGoals}
        setSelectedGoal={setSelectedGoal}
        setFormOpen={setFormOpen}
      />
    </div>
  )
}

export default Goals
