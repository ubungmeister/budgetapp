import { UserData } from '../users/types';

export interface TaskProps {
  id?: string;
  name: string;
  description: string;
  userId: string;
  amount: number;
  start_date?: Date;
  end_date?: Date;
  isActive: boolean;
  status: TaskStatus;
  feedback?: string;
}

export enum TaskStatus {
  PENDING = 'PENDING', // Task is assigned but not yet started or completed by the user.
  ON_REVIEW = 'ON_REVIEW', // User has completed the task and is waiting for admin review.
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

export interface OptionType {
  label: string;
  value: string;
}
export interface TaskFormProps {
  formOpen: boolean;
  setFormOpen: (value: React.SetStateAction<boolean>) => void;
  selectedTask: TaskProps | null;
  isAdmin: boolean;
  users: Array<OptionType>;
}