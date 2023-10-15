export interface GoalProps {
  id?: string;
  name: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  userId: string;
  start_date: Date;
  end_date: Date;
  isActive: boolean;
}

export interface GoalListProps {
  goals: GoalProps[];
  setSelectedGoal: (goal: GoalProps) => void;
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
  setSearch: (search: string) => void;
}

export interface GoalControlsProps {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
  setSelectedGoal: (goal: GoalProps | null) => void;
}
export interface GoalFormProps {
  formOpen: boolean;
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
  selectedGoal: GoalProps | null;
}
