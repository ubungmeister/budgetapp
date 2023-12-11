import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import Select, { OptionProps } from 'react-select';
import { toast } from 'react-toastify';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { z } from 'zod';

import { createReward, deleteTask, editTask } from '../../api/tasks';
import no_image from '../../assets/images/no_image.png';
import { statusLabel, statusOptions } from '../_basic/helpers/utils';
import DeleteButton from '../_basic/library/buttons/DeleteButton';
import EditFormControls from '../_basic/library/controls/EditFormControls';
import DatePickerField from '../_basic/library/date-picker/DatePickerField';
import InputField from '../_basic/library/inputs/InputField';
import ConfirmPopUp from '../_basic/library/pop-up/ConfirmPopUp';
import TaskReviewControl from './TaskReviewControl';
import {
  OptionStateType,
  OptionType,
  TaskFormProps,
  TaskStatus,
} from './types';

interface CustomOptionProps extends OptionProps<any> {
  data: {
    src: string;
  };
}

// custom option for select component, to add icon
const customOption = ({ innerProps, label, data }: CustomOptionProps) => (
  <div {...innerProps} className="flex flex-row px-3 my-2 hover:bg-slate-50">
    <img
      src={data.src || no_image}
      alt={label}
      style={{ width: '24px', marginRight: '8px' }}
    />
    <div>{label}</div>
  </div>
);

const FormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
  userId: z.string(),
  amount: z.number().nonnegative({ message: 'Amount must be positive' }),
  start_date: z.date(),
  end_date: z.date(),
  status: z.nativeEnum(TaskStatus),
});
type FormSchemaType = z.infer<typeof FormSchema>;

const TasksForm = ({
  formOpen,
  setFormOpen,
  selectedTask,
  isAdmin,
  users,
}: TaskFormProps) => {
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
  const [selectedUser, setSelectedUser] = useState<OptionType | null>();
  const [selectedStatus, setSelectedStatus] =
    useState<OptionStateType | null>();
  const [isDeleteTask, setIsDeleteTask] = useState<boolean>(false);

  useEffect(() => {
    const startDate = new Date(selectedTask?.start_date || new Date());
    const endDate = new Date(selectedTask?.end_date || new Date());

    reset({
      name: selectedTask?.name || '',
      userId: selectedTask?.userId || '',
      amount: selectedTask?.amount || 0,
      description: selectedTask?.description || '',
      start_date: startDate,
      end_date: endDate,
      status: selectedTask?.status || TaskStatus.PENDING,
    });

    const selectedUser = users.find(
      (user) => user.value === selectedTask?.userId
    );
    setSelectedUser({
      value: selectedUser?.value || '',
      label: selectedUser?.label || '',
    });

    const selectedStatus = statusOptions.find(
      (option) => option.value === selectedTask?.status
    );

    setSelectedStatus({
      value: selectedStatus?.value || (TaskStatus.PENDING as TaskStatus),
      label: statusLabel(selectedStatus?.value || TaskStatus.PENDING),
    });
  }, [selectedTask, reset]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFormOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    selectedTask ? setIsActive(selectedTask.isActive) : setIsActive(false);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setFormOpen, formOpen, selectedTask]);

  if (!formOpen) {
    return null;
  }

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const formData = {
        ...data,
        id: selectedTask?.id,
        isActive: isActive,
        userId: selectedUser?.value || '',
        status:
          selectedStatus?.value || selectedTask?.status || TaskStatus.PENDING,
      };

      const result = await editTask(formData);
      if (result?.status === 400) {
        return;
      }

      if (selectedStatus?.value === TaskStatus.APPROVED) {
        const data = {
          amount: selectedTask?.amount || 0,
          category: 'Task',
          description: 'Task Reward',
          start_date: new Date(),
          userId: selectedUser?.value || '',
          category_type: 'Income',
        };
        await createReward(data);
      }

      setFormOpen(false);
      toast.success('Task saved successfully');
    } catch (error) {
      console.log(error);
    }
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

  const onDelete = async (value: string) => {
    if (value) {
      await deleteTask(value);
    }
    setFormOpen(false);
    setIsDeleteTask(false);
    toast.success('Task deleted');
  };

  //task status handle for user
  const onTaskStatusUserChange = (newStatus: TaskStatus) => {
    try {
      if (!selectedTask) return;
      const selected = { ...selectedTask, status: newStatus };
      editTask(selected);
    } catch (error) {}
  };

  //task status handle for admin
  const onTaskStatusAdminChnage = (newStatus: any) => {
    setSelectedStatus(newStatus);
  };

  return (
    <div className=" shadow-md rounded-md  max-w-[650px] min-w-[650px]">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="divide-solid">
          {isAdmin ? (
            <EditFormControls
              form={selectedTask}
              errorNotification={''}
              setFormOpen={setFormOpen}
              submitForm={submitForm}
            />
          ) : (
            <TaskReviewControl
              setTaskStatus={onTaskStatusUserChange}
              taskStatus={selectedTask?.status || TaskStatus.PENDING}
            />
          )}

          <div className="px-4 py-10 space-x-5 flex">
            <div className="space-y-2">
              <InputField
                label="Task Title:"
                name="name"
                type="string"
                register={register}
                errors={errors}
                isDisabled={!isAdmin}
                className="input-table"
              />
              <InputField
                label="Reward:"
                name="amount"
                type="number"
                register={register}
                errors={errors}
                isDisabled={!isAdmin}
                className="input-table"
              />
              <InputField
                label="Description:"
                name="description"
                type="textarea"
                register={register}
                errors={errors}
                isDisabled={!isAdmin}
                className="input-table"
              />
              {isAdmin && (
                <div>
                  <div className="text-gray-600">Assigned User:</div>
                  <Select
                    placeholder="Category"
                    classNamePrefix="Select"
                    value={selectedUser || null}
                    options={users}
                    onChange={(option: OptionType) => setSelectedUser(option)}
                    components={{ Option: customOption }}
                  />
                  {errors && (
                    <p className="auth-error">{errors['userId']?.message}</p>
                  )}
                </div>
              )}
              {selectedTask?.id && isAdmin && (
                <DeleteButton
                  onDelete={() => setIsDeleteTask(true)}
                  selectedItem={selectedTask}
                  buttonName={'Delete Task'}
                  type="button"
                />
              )}
            </div>
            <div className="space-y-2">
              <DatePickerField
                label="Start Date:"
                name="start_date"
                control={control}
                errors={errors}
                date={selectedTask?.start_date || new Date()}
                isDisabled={!isAdmin}
                className="input-table"
              />
              <DatePickerField
                label="End Date:"
                name="end_date"
                control={control}
                errors={errors}
                date={selectedTask?.end_date || new Date()}
                isDisabled={!isAdmin}
                className="input-table"
              />

              <div className="flex text-gray-600 flex-col">
                <div>Status:</div>
                <Select
                  placeholder="Status"
                  classNamePrefix="Select"
                  value={selectedStatus || null}
                  options={statusOptions}
                  onChange={onTaskStatusAdminChnage}
                  isDisabled={!isAdmin || !selectedTask?.id}
                />
              </div>
              <div className="flex pt-8 space-x-4 pl-3">
                <p className="text-gray-600">
                  {isActive ? 'Active Task' : 'Inactive Task'}
                </p>
                <Toggle
                  id="cheese-status"
                  checked={isActive}
                  disabled={!isAdmin}
                  onChange={() => setIsActive(!isActive)}
                />
              </div>
              {isDeleteTask && (
                <ConfirmPopUp
                  title={'Delete Task'}
                  onConfirm={() => onDelete(selectedTask?.id || '')}
                  onCancel={() => setIsDeleteTask(false)}
                  isVisible={isDeleteTask}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default TasksForm;
