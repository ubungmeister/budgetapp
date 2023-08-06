export interface GoalProps {
  id?: string
  name: string
  description: string
  goalAmount: number
  currentAmount: number
  userId: string
  start_date: Date
  end_date: Date
  isActive: boolean
}

export interface GoalListProps {
  goals: GoalProps[]
  setSelectedGoal: (goal: GoalProps) => void
  setFormOpen: (formOpen: boolean) => void
}

export interface GoalControlsProps {
  isActive: boolean
  setIsActive: (isActive: boolean) => void
  setFormOpen: (formOpen: boolean) => void
  setSelectedGoal: (goal: GoalProps | null) => void
}
export interface GoalFormProps {
  formOpen: boolean
  setFormOpen: (formOpen: boolean) => void
  selectedGoal: GoalProps | null
}
