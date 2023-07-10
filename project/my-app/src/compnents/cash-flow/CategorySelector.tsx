import { CategotyTypeProps } from './types'
import { useCallback, useEffect, useState } from 'react'
import Select, { OptionProps } from 'react-select'
import { optionsExpense, optionsIncome } from './options'
import { getAllGoals } from '../../compnents/cash-flow/api'
import { optionsGoalsProps } from './types'

interface CustomOptionProps extends OptionProps<any> {
  data: {
    src: string
  }
}

// custom option for select component, to add icon
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
  const [optionsGoals, setOptionsGoals] =
    useState<Array<optionsGoalsProps> | null>(null)

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

  // get value for select component
  const getValue = useCallback(() => {
    const optionIncome = optionsIncome.find(c => c.label === category.category)
    const optionExpense = optionsExpense.find(
      c => c.label === category.category
    )
    const optionGoals = optionsGoals?.find(
      (c: any) => c.label === category.category
    )

    return optionIncome || optionExpense || optionGoals
  }, [setCategory, category])

  const onChangeHandler = useCallback(
    (selectedOption: any) => {
      setCategory({
        category: selectedOption.label,
        goalId: selectedOption.id || '',
      })
    },
    [setCategory]
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
        value={getValue() || null}
        isSearchable={false}
        onChange={onChangeHandler}
        options={options || []}
        components={{ Option: customOption }}
      />
    </div>
  )
}

export default CategorySelector
