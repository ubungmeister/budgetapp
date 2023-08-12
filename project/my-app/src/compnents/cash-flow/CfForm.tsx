import { CashFlowFormProps } from './types'
import CategorySelector from './CategorySelector'
import { useState, useEffect } from 'react'
import { useForm, Controller, set } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FaWindowClose } from 'react-icons/fa'
import axios from 'axios'
import { updateGoals } from './api'
import {
  getAllGoals,
  updateCashFlow,
  createCashFlow,
} from '../../compnents/cash-flow/api'

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
  const [categoryType, setCategoryType] = useState('')
  const [error, setError] = useState('')
  const [category, setCategory] = useState({ category: '', saving_goal_Id: '' })

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
    const findCategory = async () => {
      const goals = await getAllGoals()
      const goalName = goals?.find(
        (el: any) => el.id === selectedCashFlow?.saving_goal_Id
      )
      if (goalName) {
        setCategory({ category: goalName.name, saving_goal_Id: goalName.id })
        setCategoryType(selectedCashFlow?.category_type || '')
      } else {
        setCategory({
          category: selectedCashFlow?.category || '',
          saving_goal_Id: '',
        })
        setCategoryType(selectedCashFlow?.category_type || '')
      }
    }
    findCategory()
  }, [selectedCashFlow])

  const defaultselectedCashFlow = selectedCashFlow?.amount || 0

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    try {
      if (!category) {
        setError('Please select a category')
        return
      }
      let amount = data.amount

      if (categoryType === 'Expense' || categoryType === 'Goals') {
        if (amount > 0) {
          amount = amount * -1
        }
      }
      if (categoryType === 'Income') {
        if (amount < 0) {
          amount = amount * -1
        }
      }

      const formData = {
        ...data,
        amount: amount,
        category: category.category,
        saving_goal_Id: category.saving_goal_Id,
        userId: window.localStorage.getItem('userID') || '',
        category_type: categoryType,
      }

      if (categoryType === 'Goals') {
        const formDataAmount = { ...formData, amount: data.amount }
        const result = await updateGoals(formDataAmount)

        if (result?.status === 400) {
          setError(result.data.message)
          return
        }
        await createCashFlow(formData)
      } else {
        await createCashFlow(formData)
      }
      setFormOpen(false)
      alert('User created successfully')
      setError('')
      setCategory({ category: '', saving_goal_Id: '' })
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
      if (categoryType === 'Expense' || categoryType === 'Goals') {
        amount > 0 && (amount = -amount)
      }

      const formData = {
        ...data,
        amount: amount,
        category: category.category,
        saving_goal_Id: category.saving_goal_Id,
        userId: window.localStorage.getItem('userID') || '',
        id: selectedCashFlow?.id,
        category_type: categoryType,
      }

      if (categoryType === 'Goals') {
        const calcAmount = defaultselectedCashFlow - amount

        let formDataAmount = { ...formData, amount: calcAmount }

        const result = await axios.post(
          'http://localhost:1000/savinggoal/update-goal-amount',
          formDataAmount
        )
        if (result.status === 400) {
          setError(result.data.message)
          return
        }

        await updateCashFlow(formData)
      } else {
        await updateCashFlow(formData)
      }
      setFormOpen(false)
      alert('User created successfully')
      setError('')
      setCategory({ category: '', saving_goal_Id: '' })
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }

  //  date format for date picker
  const startDate = selectedCashFlow?.start_date
    ? new Date(selectedCashFlow.start_date)
    : null

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
              onClick={() => {
                setCategoryType('Income')
                setCategory({ category: '', saving_goal_Id: '' })
              }}
              className="border-2 rounded-md px-1 border-cyan-400"
            >
              Income
            </div>
            <div
              onClick={() => {
                setCategoryType('Expense')
                setCategory({ category: '', saving_goal_Id: '' })
              }}
              className="border-2 rounded-md px-1 border-cyan-400"
            >
              Expense
            </div>
            <div
              onClick={() => {
                setCategoryType('Goals')
                setCategory({ category: '', saving_goal_Id: '' })
              }}
              className="border-2 rounded-md px-1 border-cyan-400"
            >
              Goals
            </div>
          </div>

          <CategorySelector
            category={category}
            setCategory={setCategory}
            categoryType={categoryType}
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
