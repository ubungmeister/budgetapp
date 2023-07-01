import axios from 'axios'
import { CashFlowFormProps } from './types'
import CategorySelector from './CategorySelector'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types/form'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z.object({
  amount: z.number(),
  description: z.string().min(1, { message: 'Description is required' }),
  start_date: z.date(),
})
type FormSchemaType = z.infer<typeof FormSchema>

const CfForm = ({
  formOpen,
  setFormOpen,
  category,
  setCategory,
}: CashFlowFormProps) => {
  const [isExpense, setIsExpense] = useState(false)
  const [error, setError] = useState('')

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  })

  const expenseHandler = () => {
    //Change Button
    setIsExpense(!isExpense)
  }
  const buttonNameChange = isExpense ? 'Expense' : 'Income'

  const onSubmit: SubmitHandler<FormSchemaType> = async data => {
    console.log('ok')
    try {
      const formData = {
        ...data,
        amount: isExpense ? -data.amount : data.amount,
        category: category,
        userId: window.localStorage.getItem('userID'),
      }
      console.log('formData', formData)
      await axios.post('http://localhost:1000/cashflow/add-cash-flow', formData)
      alert('User created successfully')
      setError('')
    } catch (error: any) {
      setError(error.response.data.message)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div className="bg-white max-w-md w-90 p-8 flex flex-col gap-4 rounded-md relative">
          <div className="border-b pb-2">Add transaction</div>
          <div onClick={expenseHandler}>{buttonNameChange}</div>
          <CategorySelector
            category={category}
            setCategory={setCategory}
            isExpense={isExpense}
          />
          <div>Amount</div>
          <input
            className="auth-input"
            type="number"
            {...register('amount', { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="auth-error">{errors.amount.message}</p>
          )}
          <div>Description</div>
          <input
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
            name="start_date"
            render={({ field }) => (
              <DatePicker
                placeholderText="Select date"
                onChange={date => field.onChange(date)}
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
          {error && <p className="auth-error mb-5">{error}</p>}
        </div>
      </form>
    </>
  )
}

export default CfForm