import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { BsDatabaseAdd } from 'react-icons/bs';
import { CgCloseR } from 'react-icons/cg';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { deleteCashFlow } from '../../api/cash-flow';
import { editCashFlow } from '../../api/cash-flow';
import { updateGoals } from '../../api/cash-flow';
import {
  expenseCalculation,
  formatDecimals,
  goalsCalculation,
  incomeCalculation,
} from '../_basic/helpers/utils';
import CategotyButton from '../_basic/library/buttons/CategoryButton';
import DatePickerField from '../_basic/library/date-picker/DatePickerField';
import InputField from '../_basic/library/inputs/InputField';
import CategorySelector from './CategorySelector';
import { CashFlowFormProps, CategoryType } from './types';
import { findCategory } from './utils';

const FormSchema = z.object({
  amount: z.number(),
  description: z.string().min(1, { message: 'Description is required' }),
  start_date: z.date(),
});
type FormSchemaType = z.infer<typeof FormSchema>;

const CashFlowForm = ({
  formOpen,
  cashFlow,
  setFormOpen,
  selectedCashFlow,
  pocketMoney,
  setCashFlowDeleted,
}: CashFlowFormProps) => {
  const [categoryType, setCategoryType] = useState('');
  const [error, setError] = useState('');
  const [category, setCategory] = useState<CategoryType>({
    category: '',
    saving_goal_Id: '',
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const startDate = new Date(selectedCashFlow?.start_date || new Date());
    reset({
      amount: selectedCashFlow?.amount || 0,
      description: selectedCashFlow?.description || '',
      start_date: startDate,
    });
    findCategory({ selectedCashFlow, setCategory, setCategoryType });
  }, [selectedCashFlow]);

  const amounts = cashFlow.map((item) => item.amount);
  const expense = Math.abs(expenseCalculation(cashFlow));
  const income = incomeCalculation(amounts);
  const goals = Math.abs(goalsCalculation(cashFlow));
  const totalOutcome = Math.abs(expense) + goals;
  const totalIncome = income + (pocketMoney?.amount || 0);
  const total = formatDecimals(totalIncome - totalOutcome);

  const onCategorySelectHandler = (categotyType: string) => {
    setCategoryType(categotyType);
    setCategory({ category: '', saving_goal_Id: '' });
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      let amount = data.amount;
      // check the amount, if it is expense or goal, then make it negative and check if balance is exceeded
      if (categoryType === 'Goals' || categoryType === 'Expense') {
        amount = Math.abs(data.amount) * -1;
        const isBalanceExceeded = total + amount < 0;
        if (isBalanceExceeded) {
          setError('Balance exceeded');
          return;
        }
      }
      const formData = {
        ...data,
        id: selectedCashFlow?.id,
        amount: amount,
        category: category.category,
        saving_goal_Id: category.saving_goal_Id,
        userId: window.localStorage.getItem('userID') || '',
        category_type: categoryType,
      };

      if (categoryType === 'Goals') {
        const formDataAmount = { ...formData, amount: Math.abs(data.amount) };
        const { success, error } = await updateGoals(formDataAmount);
        if (!success) {
          if (error?.status === 400) {
            setError(error.data.message);
          } else {
            setError('An unexpected error occurred');
          }
          return;
        }
        await editCashFlow(formData);
      } else {
        await editCashFlow(formData);
      }
      setFormOpen(false);

      toast.success('Transaction created');
      setError('');
      setCategory({ category: '', saving_goal_Id: '' });
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  //  date format for date picker
  const startDate = selectedCashFlow?.start_date
    ? new Date(selectedCashFlow.start_date)
    : new Date();

  const onDeleteChashFlow = async (e: any, cashFlowID: string) => {
    e.preventDefault();
    await deleteCashFlow(cashFlowID as string);
    setCashFlowDeleted(true);
    setFormOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" w-full h-full flex">
      <div className="bg-gray-100  max-w-md w-[25rem] p-4 flex flex-col space-y-2 relative rounded-md shadow-lg">
        <div className="flex flex-row space-x-2">
          <div className="pt-1">
            <BsDatabaseAdd style={{ color: '#3b757f' }} />
          </div>
          <div className="flex flex-row pb-2">
            <p className="font-semibold">Add transaction</p>
            <div className="absolute top-0 right-0 cursor-pointer opacity-60 hover:opacity-100">
              <CgCloseR
                style={{ color: '#3b757f', fontSize: '25px' }}
                onClick={() => setFormOpen(false)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 pb-2">
          <div className="flex flex-row space-x-5 justify-stretch">
            <CategotyButton
              selectedCashFlow={selectedCashFlow}
              category={'Income'}
              onCategorySelectHandler={onCategorySelectHandler}
              categoryType={categoryType}
            />
            <CategotyButton
              selectedCashFlow={selectedCashFlow}
              category={'Expense'}
              onCategorySelectHandler={onCategorySelectHandler}
              categoryType={categoryType}
            />
            <CategotyButton
              selectedCashFlow={selectedCashFlow}
              category={'Goals'}
              onCategorySelectHandler={onCategorySelectHandler}
              categoryType={categoryType}
            />
          </div>
          <CategorySelector
            category={category}
            setCategory={setCategory}
            categoryType={categoryType}
          />
        </div>
        <div className="flex flex-col space-y-0">
          <InputField
            label="Amount:"
            name="amount"
            type="number"
            register={register}
            errors={errors}
            className="auth-input"
          />
          <InputField
            label="Description:"
            name="description"
            type="textarea"
            register={register}
            errors={errors}
            className="auth-input"
          />
          <DatePickerField
            label="End Date:"
            name="start_date"
            control={control}
            errors={errors}
            date={startDate}
            className="auth-input"
          />
        </div>
        <div className=" flex flex-row space-x-2">
          <button className="auth-button" type="submit" disabled={isSubmitting}>
            {selectedCashFlow ? 'Update' : 'Submit'}
          </button>
          {selectedCashFlow && (
            <button
              className="button-disabled px-3 py-2 w-full mb-4 hover:bg-gray-400"
              disabled={isSubmitting}
              onClick={(e) =>
                onDeleteChashFlow(e, selectedCashFlow.id as string)
              }
            >
              Delete
            </button>
          )}
        </div>
        {error && <p className="auth-error mb-5">{error}</p>}
      </div>
    </form>
  );
};

export default CashFlowForm;
