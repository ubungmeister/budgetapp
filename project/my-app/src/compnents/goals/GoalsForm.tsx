import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { GoalFormProps } from './types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import { FaWindowClose } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { createGoal, updateGoal } from './api'

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  goalAmount: z.number(),
  start_date: z.date(),
  end_date: z.date(),
})
type FormSchemaType = z.infer<typeof FormSchema>

const GoalsForm = ({ formOpen, setFormOpen, selectedGoal }: GoalFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFormOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    selectedGoal ? setIsActive(selectedGoal.isActive) : setIsActive(false)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setFormOpen, formOpen])

  console.log(selectedGoal)

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    try {
      const formData = {
        ...data,
        isActive: isActive,
        userId: window.localStorage.getItem('userID') || '',
        currentAmount: selectedGoal?.currentAmount || 0,
      }

      const result = await createGoal(formData)
      if (result?.status === 400) {
        return
      }
      setFormOpen(false)
      alert('Goal created successfully')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate: SubmitHandler<FormSchemaType> = async data => {
    try {
      const formData = {
        ...data,
        id: selectedGoal?.id,
        isActive: isActive,
        userId: window.localStorage.getItem('userID') || '',
        currentAmount: selectedGoal?.currentAmount || 0,
      }
      await updateGoal(formData)
      setFormOpen(false)
      alert('Goal created successfully')
    } catch (error) {
      console.log(error)
    }
  }

  //  date format for date picker
  const startDate = selectedGoal?.start_date
    ? new Date(selectedGoal.start_date)
    : null

  const endDate = selectedGoal?.end_date
    ? new Date(selectedGoal.end_date)
    : null

  return (
    <form
      onSubmit={
        selectedGoal ? handleSubmit(handleUpdate) : handleSubmit(onSubmit)
      }
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="bg-white max-w-md w-90 p-8 flex flex-col gap-4 rounded-md relative">
        <div>
          <FaWindowClose onClick={() => setFormOpen(false)} />
        </div>
        <div className="bg-white max-w-md w-90 p-8 flex flex-col gap-4 rounded-md relative">
          <div className="border-b pb-2">Goal</div>
        </div>
        <div>Name</div>
        <input
          defaultValue={selectedGoal?.name || ''}
          className="auth-input"
          type="text"
          {...register('name')}
        />
        {errors.name && <p className="auth-error">{errors.name.message}</p>}
        <div>Amount</div>
        <input
          defaultValue={selectedGoal?.goalAmount || ''}
          className="auth-input"
          type="number"
          {...register('goalAmount', { valueAsNumber: true })}
        />
        {errors.goalAmount && (
          <p className="auth-error">{errors.goalAmount.message}</p>
        )}
        <div>Description</div>
        <input
          defaultValue={selectedGoal?.description || ''}
          className="auth-input"
          type="text"
          {...register('description')}
        />
        {errors.description && (
          <p className="auth-error">{errors.description.message}</p>
        )}
        <div>Start Date</div>
        <Controller
          control={control}
          defaultValue={startDate || undefined}
          name="start_date"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select date"
              onChange={date => field.onChange(date)}
              dateFormat="dd/MM/yyyy"
              selected={field.value}
            />
          )}
        />
        {errors.start_date && (
          <p className="auth-error">{errors.start_date.message}</p>
        )}
        <div>End Date</div>
        <Controller
          control={control}
          defaultValue={endDate || undefined}
          name="end_date"
          render={({ field }) => (
            <DatePicker
              placeholderText="Select date"
              onChange={date => field.onChange(date)}
              dateFormat="dd/MM/yyyy"
              selected={field.value}
            />
          )}
        />
        {errors.end_date && (
          <p className="auth-error">{errors.end_date.message}</p>
        )}
        <div onClick={() => setIsActive(!isActive)}>
          isActive: {isActive ? 'true' : 'false'}
        </div>
        <button className="auth-button" type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  )
}

export default GoalsForm
