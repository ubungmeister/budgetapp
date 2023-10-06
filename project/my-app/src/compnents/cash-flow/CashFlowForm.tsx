import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { BsDatabaseAdd } from 'react-icons/bs';
import { CgCloseR } from 'react-icons/cg';
import { z } from 'zod';

import { formatDecimals } from '../_basic/helpers/utils';
import CategotyButton from '../_basic/library/buttons/CategoryButton';
import { deleteCashFlow } from '../cash-flow/api';
import CategorySelector from './CategorySelector';
import { createCashFlow, updateCashFlow } from './api';
import { updateGoals } from './api';
import { CashFlowFormProps, CategoryType } from './types';
import { findCategory } from './utils';
import { checkForm } from './utils';

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
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    // close form on escape key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFormOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setFormOpen]);

  useEffect(() => {
    // set selected category
    findCategory({ selectedCashFlow, setCategory, setCategoryType });
  }, [selectedCashFlow]);

  const defaultselectedCashFlow = selectedCashFlow?.amount || 0;

  const amounts = cashFlow.map((item) => item.amount);

  const income = formatDecimals(
    amounts.filter((el) => el > 0).reduce((acc, el) => acc + el, 0)
  );
  const expense = formatDecimals(
    amounts.filter((el) => el < 0).reduce((acc, el) => acc + el, 0)
  );

  const totalIncome = income + (pocketMoney?.amount || 0);

  const onCategorySelectHandler = (categotyType: string) => {
    setCategoryType(categotyType);
    setCategory({ category: '', saving_goal_Id: '' });
  };

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const amount = checkForm({
        category,
        categoryType,
        data,
        setError,
        totalIncome,
        expense,
      });

      if (amount === undefined) {
        // If error occurred in checkForm, don't proceed request
        return;
      }

      const formData = {
        ...data,
        amount: amount,
        category: category.category,
        saving_goal_Id: category.saving_goal_Id,
        userId: window.localStorage.getItem('userID') || '',
        category_type: categoryType,
      };

      if (categoryType === 'Goals') {
        const formDataAmount = { ...formData, amount: Math.abs(data.amount) };
        const result = await updateGoals(formDataAmount);

        if (result?.status === 400) {
          setError(result.data.message);
          return;
        }
        await createCashFlow(formData);
      } else {
        await createCashFlow(formData);
      }
      setFormOpen(false);
      alert('User created successfully');
      setError('');
      setCategory({ category: '', saving_goal_Id: '' });
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  const handleUpdate: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const amount = checkForm({
        category,
        categoryType,
        data,
        setError,
        totalIncome,
        expense,
      });

      if (amount === undefined) {
        // If error occurred in checkForm, don't proceed request
        return;
      }

      const formData = {
        ...data,
        amount: amount,
        category: category.category,
        saving_goal_Id: category.saving_goal_Id,
        userId: window.localStorage.getItem('userID') || '',
        id: selectedCashFlow?.id,
        category_type: categoryType,
      };

      if (categoryType === 'Goals') {
        const calcAmount = defaultselectedCashFlow - amount;

        let formDataAmount = { ...formData, amount: calcAmount };

        const result = await axios.post(
          'http://localhost:1000/savinggoal/update-goal-amount',
          formDataAmount
        );
        if (result.status === 400) {
          setError(result.data.message);
          return;
        }

        await updateCashFlow(formData);
      } else {
        await updateCashFlow(formData);
      }
      setFormOpen(false);
      alert('User created successfully');
      setError('');
      setCategory({ category: '', saving_goal_Id: '' });
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  //  date format for date picker
  const startDate = selectedCashFlow?.start_date
    ? new Date(selectedCashFlow.start_date)
    : null;

  const onDeleteChashFlow = async (cashFlowID: string) => {
    await deleteCashFlow(cashFlowID as string);
    setCashFlowDeleted(true);
    setFormOpen(false);
  };

  return (
    <>
      <form
        onSubmit={
          selectedCashFlow ? handleSubmit(handleUpdate) : handleSubmit(onSubmit)
        }
        className=" w-full h-full flex"
      >
        <div className="bg-gray-100  max-w-md w-[25rem] p-4 flex flex-col space-y-2 relative rounded-md">
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
          <div>
            <div>Amount</div>
            <input
              defaultValue={selectedCashFlow?.amount || ''}
              className="auth-input"
              type="float"
              min={categoryType === 'Income' ? 0 : undefined}
              {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="auth-error">{errors.amount.message}</p>
            )}
          </div>

          <div>Description</div>
          <textarea
            defaultValue={selectedCashFlow?.description || ''}
            className="auth-input"
            {...register('description')}
          />
          {errors.description && (
            <p className="auth-error">{errors.description.message}</p>
          )}
          <div className="flex flex-col space-y-1 pb-2">
            <div>Date</div>
            <Controller
              control={control}
              defaultValue={startDate || undefined}
              name="start_date"
              render={({ field }) => (
                <DatePicker
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd/MM/yyyy"
                  selected={field.value}
                  className="auth-input"
                />
              )}
            />
            {errors.start_date && (
              <p className="auth-error">{errors.start_date.message}</p>
            )}
          </div>
          <div className=" flex flex-row space-x-2">
            <button
              className="auth-button"
              type="submit"
              disabled={isSubmitting}
            >
              {selectedCashFlow ? 'Update' : 'Submit'}
            </button>
            {selectedCashFlow && (
              <button
                className="button-disabled px-3 py-2 w-full mb-4 hover:bg-gray-400"
                disabled={isSubmitting}
                onClick={() => onDeleteChashFlow(selectedCashFlow.id as string)}
              >
                Delete
              </button>
            )}
          </div>
          {error && <p className="auth-error mb-5">{error}</p>}
        </div>
      </form>
    </>
  );
};

export default CashFlowForm;
