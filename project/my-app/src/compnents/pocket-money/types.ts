import { BudgetData } from '../budget/types';
import { UserData } from '../users/types';

export interface PmType {
  month: Date;
  amount: number;
  userId: string;
  id?: string;
}

export interface PmData {
  id?: string;
  userID?: string;
  username?: string;
  amount?: number;
  month?: string;
}

export interface PmTableProps {
  users: Array<UserData>;
  monthsAndBudget: Array<BudgetData>;
  pocketMoney: Array<PmType>;
  setPocketMoney: React.Dispatch<React.SetStateAction<PmType[]>>;
  setSaveDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface PmControlsProps {
  handleSavePm: () => void;
  setChangeCancel: (value: React.SetStateAction<boolean>) => void;
  setIsMonthChange: React.Dispatch<React.SetStateAction<string>>;
  saveDiasbled: boolean;
  sussessAlert: boolean;
}

export interface PmListProps {
  monthsAndBudget: Array<BudgetData>;
}

export interface PmGroupedData {
  [key: string]: number;
}
