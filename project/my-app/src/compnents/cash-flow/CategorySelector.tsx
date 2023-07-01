import { CategotyTypeProps } from './types'
import { useCallback } from 'react'
import Select, { OptionProps } from 'react-select'
import { optionsExpense, optionsIncome } from './options'

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
  const getValue = useCallback(() => {
    return category
      ? optionsExpense.find(c => c.value === category)
      : optionsIncome.find(c => c.value === category)
  }, [setCategory])

  const onChangeHandler = useCallback(
    (selectedOption: any) => {
      setCategory(selectedOption.value)
      // props.category(e.value, e.src)
    },
    [category]
  )

  const options = isExpense ? optionsExpense : optionsIncome

  return (
    <div>
      <Select
        placeholder="Category"
        classNamePrefix="Select"
        value={getValue()}
        isSearchable={false}
        onChange={onChangeHandler}
        options={options}
        components={{ Option: customOption }}
      />
    </div>
  )
}

export default CategorySelector
