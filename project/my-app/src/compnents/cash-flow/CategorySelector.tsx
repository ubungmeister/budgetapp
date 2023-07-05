import { CategotyTypeProps } from './types'
import { useCallback, useEffect, useState } from 'react'
import Select, { OptionProps } from 'react-select'
import { optionsExpense, optionsIncome } from './options'
import { getAllGoals } from '../../compnents/cash-flow/api'

interface CustomOptionProps extends OptionProps<any> {
  data: {
    src: string
  }
}

const customOption = ({ innerProps, label, data }: CustomOptionProps) => (
  <div {...innerProps} className="flex flex-row px-3 my-2 hover:bg-slate-50">
    <img
      src={data.src}
      alt={label}
      style={{ width: '24px', marginRight: '8px' }}
    />
    <div>{label}</div>
  </div>
)

const CategorySelector = ({
  category,
  setCategory,
  isExpense,
}: CategotyTypeProps) => {
  const [optionsGoals, setOptionsGoals] = useState()

  useEffect(() => {
    const getGoals = async () => {
      const goals = await getAllGoals()
      const golasWithLabel = goals?.map((goal: any) => {
        return {
          label: goal.name,
          id: goal.id,
          src: '',
          currentAmount: goal.currentAmount,
          goalAmount: goal.goalAmount,
          isActive: goal.isActive,
        }
      })
      setOptionsGoals(golasWithLabel)
    }
    getGoals()
  }, [])

  const getValue = useCallback(() => {
    return category.category
      ? optionsExpense.find(c => c.value === category.category)
      : optionsIncome.find(c => c.value === category.category)
  }, [setCategory])

  const onChangeHandler = useCallback(
    (selectedOption: any) => {
      setCategory({
        category: selectedOption.label,
        goalId: selectedOption.id || '',
      })
    },
    [category]
  )

  const options =
    isExpense === 'Income'
      ? optionsIncome
      : isExpense === 'Expense'
      ? optionsExpense
      : optionsGoals

  return (
    <div>
      <Select
        placeholder="Category"
        classNamePrefix="Select"
        value={category ? getValue() : null}
        isSearchable={false}
        onChange={onChangeHandler}
        options={options}
        components={{ Option: customOption }}
      />
    </div>
  )
}

export default CategorySelector
