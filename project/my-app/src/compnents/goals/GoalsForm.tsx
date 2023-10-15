import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { z } from 'zod';

// for ES6 modules
import EditFormControls from '../_basic/helpers/EditFormControls';
import { createGoal, updateGoal } from './api';
import { GoalFormProps } from './types';

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  goalAmount: z.number(),
  start_date: z.date(),
  end_date: z.date(),
});
type FormSchemaType = z.infer<typeof FormSchema>;

const GoalsForm = ({ formOpen, setFormOpen, selectedGoal }: GoalFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    console.log('here');
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFormOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    selectedGoal ? setIsActive(selectedGoal.isActive) : setIsActive(false);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setFormOpen, formOpen, selectedGoal]);

  if (!formOpen) {
    return null;
  }

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const formData = {
        ...data,
        isActive: isActive,
        userId: window.localStorage.getItem('userID') || '',
        currentAmount: selectedGoal?.currentAmount || 0,
      };

      const result = await createGoal(formData);
      if (result?.status === 400) {
        return;
      }
      setFormOpen(false);
      alert('Goal created successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const formData = {
        ...data,
        id: selectedGoal?.id,
        isActive: isActive,
        userId: window.localStorage.getItem('userID') || '',
        currentAmount: selectedGoal?.currentAmount || 0,
      };
      await updateGoal(formData);
      setFormOpen(false);
      alert('Goal created successfully');
    } catch (error) {
      console.log(error);
    }
  };

  //  date format for date picker
  const startDate = selectedGoal?.start_date
    ? new Date(selectedGoal.start_date)
    : null;

  const endDate = selectedGoal?.end_date
    ? new Date(selectedGoal.end_date)
    : null;

  const submitForm = () => {
    if (formRef.current) {
      const formElement = formRef.current;
      const submitEvent = new Event('submit', { cancelable: true });

      if (
        formElement.dispatchEvent(submitEvent) &&
        !submitEvent.defaultPrevented
      ) {
        selectedGoal ? handleSubmit(handleUpdate) : handleSubmit(onSubmit);
      }
    }
  };

  return (
    <div className=" shadow-md rounded-md  max-w-[650px] min-w-[650px]">
      <form
        ref={formRef}
        onSubmit={
          selectedGoal ? handleSubmit(handleUpdate) : handleSubmit(onSubmit)
        }
      >
        <div className="divide-solid divide-y">
          <EditFormControls
            form={selectedGoal}
            errorNotification={''}
            setFormOpen={setFormOpen}
            submitForm={submitForm}
          />
          <div className="px-4 py-10 space-x-5 flex">
            <div className="space-y-2">
              <div className="flex flex-col text-[15px]">
                <p className="text-gray-600 pb-1">Name:</p>
                <input
                  defaultValue={selectedGoal?.name || ''}
                  className="input-table"
                  type="text"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="auth-error">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col text-[15px]">
                <p className="text-gray-600 pb-1">Amount:</p>
                <input
                  defaultValue={selectedGoal?.goalAmount || ''}
                  className="input-table"
                  type="text"
                  {...register('name')}
                />
                {errors.goalAmount && (
                  <p className="auth-error">{errors.goalAmount.message}</p>
                )}
              </div>
              <div className="flex flex-col text-[15px]">
                <p className="text-gray-600 pb-1">Description:</p>
                <textarea
                  defaultValue={selectedGoal?.description || ''}
                  className="input-table"
                  {...register('name')}
                />
                {errors.description && (
                  <p className="auth-error">{errors.description.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-col text-[15px]">
                <p className="text-gray-600 pb-1">Start Date:</p>
                <Controller
                  control={control}
                  defaultValue={startDate || undefined}
                  name="start_date"
                  render={({ field }) => (
                    <DatePicker
                      className="input-table"
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      dateFormat="dd/MM/yyyy"
                      selected={field.value}
                    />
                  )}
                />
                {errors.start_date && (
                  <p className="auth-error">{errors.start_date.message}</p>
                )}
              </div>
              <div className="flex flex-col text-[15px]">
                <p className="text-gray-600 pb-1">End Date:</p>
                <Controller
                  control={control}
                  defaultValue={endDate || undefined}
                  name="end_date"
                  render={({ field }) => (
                    <DatePicker
                      className="input-table"
                      placeholderText="Select date"
                      onChange={(date) => field.onChange(date)}
                      dateFormat="dd/MM/yyyy"
                      selected={field.value}
                    />
                  )}
                />
                {errors.end_date && (
                  <p className="auth-error">{errors.end_date.message}</p>
                )}
              </div>

              <div className="flex pt-8 space-x-4 pl-7">
                <p className="text-gray-600">
                  {isActive ? 'Active Goal' : 'Inactive Goal'}
                </p>
                <Toggle
                  id="cheese-status"
                  checked={isActive}
                  onChange={() => setIsActive(!isActive)}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GoalsForm;
