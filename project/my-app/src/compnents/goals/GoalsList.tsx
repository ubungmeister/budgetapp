import { GoalListProps, GoalProps } from './types'

const GoalsList = ({ goals, setSelectedGoal, setFormOpen }: GoalListProps) => {
  const onGoalSelect = (goal: GoalProps) => {
    setSelectedGoal(goal)
    setFormOpen(true)
  }
  return (
    <div>
      <div>
        {goals.map(goal => {
          return (
            <div key={goal.id} className="flex flex-row space-x-5">
              <div>{goal.name}</div>
              <div>{goal.goalAmount}</div>
              <div>{goal.currentAmount}</div>
              <div onClick={() => onGoalSelect(goal)}>Edit goal</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default GoalsList
