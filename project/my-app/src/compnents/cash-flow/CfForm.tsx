import axios from 'axios'
import { CashFlowFormProps } from './types'
import CategorySelector from './CategorySelector'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaWindowClose } from 'react-icons/fa'
import { getAllGoals } from '../../compnents/cash-flow/api'

const FormSchema = z.object({
  amount: z.number(),
  description: z.string().min(1, { message: 'Description is required' }),
  start_date: z.date(),
})
type FormSchemaType = z.infer<typeof FormSchema>

const CfForm = ({
  formOpen,
  setFormOpen,
  selectedCashFlow,
}: CashFlowFormProps) => {
  const [isExpense, setIsExpense] = useState('')
  const [error, setError] = useState('')
  const [category, setCategory] = useState({ category: '', goalId: '' })

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFormOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setFormOpen])

  useEffect(() => {
    setCategory({ category: '', goalId: '' })
  }, [isExpense, setIsExpense])

  useEffect(() => {
    const findCategory = async () => {
      const goals = await getAllGoals()
      const goalName = goals?.find(
        (el: any) => el.id === selectedCashFlow?.saving_goal_Id
      )
      if (goalName) {
        setCategory({ category: goalName.name, goalId: goalName.id })
      } else {
        setCategory({
          category: selectedCashFlow?.category || '',
          goalId: '',
        })
      }
    }
    findCategory()
  }, [selectedCashFlow])

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    try {
      if (!category) {
        setError('Please select a category')
        return
      }

      let amount = data.amount
      if (isExpense === 'Expense') {
        amount = -amount
      }

      const formData = {
        ...data,
        amount: amount,
        category: category.category,
        goalId: category.goalId,
        userId: window.localStorage.getItem('userID'),
      }

      if (isExpense === 'Goals') {
        const result = await axios.post(
          'http://localhost:1000/savinggoal/update-goal',
          formData
        )
        if (result.status === 400) {
          setError(result.data.message)
          return
        }
        await axios.post(
          'http://localhost:1000/cashflow/add-cash-flow',
          formData
        )
      } else {
        await axios.post(
          'http://localhost:1000/cashflow/add-cash-flow',
          formData
        )
      }
      setFormOpen(false)
      alert('User created successfully')
      setError('')
      setCategory({ category: '', goalId: '' })
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }

  const handleUpdate: SubmitHandler<FormSchemaType> = async data => {
    try {
      if (!category) {
        setError('Please select a category')
        return
      }

      let amount = data.amount
      if (isExpense === 'Expense') {
        amount = -amount
      }

      const formData = {
        ...data,
        amount: amount,
        category: category.category,
        goalId: category.goalId,
        userId: window.localStorage.getItem('userID'),
        id: selectedCashFlow?.id,
      }

      if (isExpense === 'Goals') {
        const result = await axios.post(
          'http://localhost:1000/savinggoal/update-goal',
          formData
        )
        if (result.status === 400) {
          setError(result.data.message)
          return
        }
        await axios.post(
          'http://localhost:1000/cashflow/update-cash-flow',
          formData
        )
      } else {
        await axios.post(
          'http://localhost:1000/cashflow/update-cash-flow',
          formData
        )
      }
      setFormOpen(false)
      alert('User created successfully')
      setError('')
      setCategory({ category: '', goalId: '' })
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }

  //  date format for date picker
  const startDate = selectedCashFlow?.start_date
    ? new Date(selectedCashFlow.start_date)
    : null

  console.log('selectedCashFlow', selectedCashFlow)
  return (
    <>
      <form
        onSubmit={
          selectedCashFlow ? handleSubmit(handleUpdate) : handleSubmit(onSubmit)
        }
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div>
          <FaWindowClose onClick={() => setFormOpen(false)} />
        </div>
        <div className="bg-white max-w-md w-90 p-8 flex flex-col gap-4 rounded-md relative">
          <div className="border-b pb-2">Add transaction</div>
          <div className="flex flex-row space-x-5">
            <div
              onClick={() => setIsExpense('Income')}
              className="border-2 rounded-md px-1 border-cyan-400"
            >
              Income
            </div>
            <div
              onClick={() => setIsExpense('Expense')}
              className="border-2 rounded-md px-1 border-cyan-400"
            >
              Expense
            </div>
            <div
              onClick={() => setIsExpense('Goals')}
              className="border-2 rounded-md px-1 border-cyan-400"
            >
              Goals
            </div>
          </div>

          <CategorySelector
            category={category}
            setCategory={setCategory}
            isExpense={isExpense}
          />
          {error && <p className="auth-error mb-5">{error}</p>}

          <div>Amount</div>
          <input
            defaultValue={selectedCashFlow?.amount || ''}
            className="auth-input"
            type="number"
            {...register('amount', { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="auth-error">{errors.amount.message}</p>
          )}
          <div>Description</div>
          <input
            defaultValue={selectedCashFlow?.description || ''}
            className="auth-input"
            type="text"
            {...register('description')}
          />
          {errors.description && (
            <p className="auth-error">{errors.description.message}</p>
          )}
          <div>Date</div>
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
          <button className="auth-button" type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default CfForm
