import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { toast } from 'react-toastify';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { z } from 'zod';

import { deleteGoal } from '../../api/goals';
import { editGoal } from '../../api/goals';
import DeleteButton from '../_basic/library/buttons/DeleteButton';
import EditFormControls from '../_basic/library/controls/EditFormControls';
import DatePickerField from '../_basic/library/date-picker/DatePickerField';
import InputField from '../_basic/library/inputs/InputField';
import ConfirmPopUp from '../_basic/library/pop-up/ConfirmPopUp';
import ProgressLine from '../_basic/library/progress-line/ProgressLine';
import { GoalFormProps } from './types';

const FormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
  goalAmount: z.number().min(1, { message: 'Goal amount must be positive' }),
  start_date: z.date(),
  end_date: z.date(),
});
type FormSchemaType = z.infer<typeof FormSchema>;

const GoalsForm = ({ formOpen, setFormOpen, selectedGoal }: GoalFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const [isActive, setIsActive] = useState(false);
  const [isDeleteGoal, setIsDeleteGoal] = useState(false);

  useEffect(() => {
    //reset all input fields on Goal change
    const startDate = new Date(selectedGoal?.start_date || new Date());
    const endDate = new Date(selectedGoal?.end_date || new Date());

    reset({
      name: selectedGoal?.name || '',
      goalAmount: selectedGoal?.goalAmount || 0,
      description: selectedGoal?.description || '',
      start_date: startDate,
      end_date: endDate,
    });
  }, [selectedGoal, reset]);

  useEffect(() => {
    selectedGoal ? setIsActive(selectedGoal.isActive) : setIsActive(false);
  }, [setFormOpen, formOpen, selectedGoal]);

  if (!formOpen) {
    return null;
  }

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const formData = {
        ...data,
        id: selectedGoal?.id,
        isActive: isActive,
        userId: window.localStorage.getItem('userID') || '',
        currentAmount: selectedGoal?.currentAmount || 0,
      };

      const result = await editGoal(formData);
      if (result?.status === 400) {
        return;
      }
      setFormOpen(false);
      selectedGoal?.id
        ? toast.success('Goal updated')
        : toast.success('Goal created ');
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (value: string) => {
    if (value) {
      await deleteGoal(value);
    }
    setFormOpen(false);
    setIsDeleteGoal(false);
    toast.success('Goal deleted ');
  };

  //handle click on submit button
  const submitForm = () => {
    if (formRef.current) {
      const formElement = formRef.current;
      const submitEvent = new Event('submit', { cancelable: true });
      if (
        formElement.dispatchEvent(submitEvent) &&
        !submitEvent.defaultPrevented
      ) {
        handleSubmit(onSubmit);
      }
    }
  };

  return (
    <div className=" shadow-md rounded-md  max-w-[650px] min-w-[650px]">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="divide-solid">
          <EditFormControls
            form={selectedGoal}
            errorNotification={''}
            setFormOpen={setFormOpen}
            submitForm={submitForm}
          />
          <div className="px-4 py-10 space-x-5 flex">
            <div className="space-y-2">
              <InputField
                label="Goal Title:"
                name="name"
                type="string"
                register={register}
                errors={errors}
                className="input-table"
              />
              <InputField
                label="Goal Amount:"
                name="goalAmount"
                type="number"
                register={register}
                errors={errors}
                className="input-table"
              />
              <InputField
                label="Description:"
                name="description"
                type="textarea"
                register={register}
                errors={errors}
                className="input-table"
              />
              {selectedGoal?.id && (
                <div className="flex flex-col text-[15px]">
                  <p className="text-gray-600 pb-1">Progress:</p>
                  <ProgressLine selectedGoal={selectedGoal} width={'255px'} />
                </div>
              )}
              {selectedGoal?.id && (
                <DeleteButton
                  type="button"
                  onDelete={() => setIsDeleteGoal(true)}
                  selectedItem={selectedGoal}
                  buttonName={'Delete Goal'}
                />
              )}
            </div>
            <div className="space-y-3">
              <DatePickerField
                label="Start Date:"
                name="start_date"
                control={control}
                errors={errors}
                date={selectedGoal?.start_date || new Date()}
                className="input-table"
              />
              <DatePickerField
                label="End Date:"
                name="end_date"
                control={control}
                errors={errors}
                date={selectedGoal?.end_date || new Date()}
                className="input-table"
              />
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
              {isDeleteGoal && (
                <ConfirmPopUp
                  title={'Delete Task'}
                  onConfirm={() => onDelete(selectedGoal?.id || '')}
                  onCancel={() => setIsDeleteGoal(false)}
                  isVisible={isDeleteGoal}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GoalsForm;
