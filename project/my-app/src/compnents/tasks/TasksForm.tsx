import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Controller, useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import Select, { OptionProps } from 'react-select';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { z } from 'zod';

import no_image from '../../assets/images/no_image.png';
import EditFormControls from '../_basic/helpers/EditFormControls';
import DeleteButton from '../_basic/library/buttons/DeleteButton';
import { deleteTask, editTask } from './api';
import { OptionType, TaskFormProps, TaskStatus } from './types';

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
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  userId: z.string(),
  amount: z.number(),
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

  console.log('selectedUser', selectedUser);

  useEffect(() => {
    //reset all input fields on Goal change
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
        status: selectedTask?.status || TaskStatus.PENDING,
      };

      const result = await editTask(formData);
      if (result?.status === 400) {
        return;
      }
      setFormOpen(false);
      alert('Task saved successfully');
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
      const shouldDelete = window.confirm(
        'Are you sure you want to delete this Goal?'
      );

      if (shouldDelete) {
        await deleteTask(value);
      }
    }
    setFormOpen(false);
  };

  const onSelectHandler = (option: OptionType) => {
    setSelectedUser(option);
  };

  return (
    <div className=" shadow-md rounded-md  max-w-[650px] min-w-[650px]">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="divide-solid">
          <EditFormControls
            form={selectedTask}
            errorNotification={''}
            setFormOpen={setFormOpen}
            submitForm={submitForm}
          />
          <div className="px-4 py-10 space-x-5 flex">
            <div className="space-y-2">
              <div className="flex flex-col text-[15px]">
                <p className="text-gray-600 pb-1">Task title:</p>
                <input
                  className="input-table"
                  type="text"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="auth-error">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col text-[15px]">
                <p className="text-gray-600 pb-1">Reward:</p>
                <input
                  className="input-table"
                  type="float"
                  {...register('amount', { valueAsNumber: true })}
                />
                {errors.amount && (
                  <p className="auth-error">{errors.amount.message}</p>
                )}
              </div>
              <div className="flex flex-col text-[15px]">
                <p className="text-gray-600 pb-1">Description:</p>
                <textarea
                  className="input-table"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="auth-error">{errors.description.message}</p>
                )}
              </div>
              <div>Status: {selectedTask?.status}</div>
              <div>
                <div>Assigned User:</div>
                <Select
                  placeholder="Category"
                  classNamePrefix="Select"
                  value={selectedUser || null}
                  options={users}
                  onChange={onSelectHandler}
                  components={{ Option: customOption }}
                />
              </div>
              {/* <div>Comments: {selectedTask?.feedback}</div> */}
              {selectedTask?.id && (
                <DeleteButton
                  onDelete={onDelete}
                  selectedItem={selectedTask}
                  buttonName={'Delete Task'}
                />
              )}
            </div>
            <div className="space-y-2">
              <div className="flex flex-col text-[15px]">
                <p className="text-gray-600 pb-1">Start Date:</p>
                <Controller
                  control={control}
                  defaultValue={selectedTask?.start_date || new Date()}
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
                  defaultValue={selectedTask?.end_date || undefined}
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
export default TasksForm;
