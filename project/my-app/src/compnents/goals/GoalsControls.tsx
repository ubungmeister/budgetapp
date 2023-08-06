import React from 'react'
import { GoalControlsProps } from './types'

const GoalsControls = ({
  isActive,
  setIsActive,
  setFormOpen,
  setSelectedGoal,
}: GoalControlsProps) => {
  const onCreateGoal = () => {
    setFormOpen(true)
    setSelectedGoal(null)
  }
  return (
    <div>
      <div onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Currently Active' : 'All Goals'}
      </div>
      <div onClick={() => onCreateGoal()}> Add Goal </div>
    </div>
  )
}

export default GoalsControls
