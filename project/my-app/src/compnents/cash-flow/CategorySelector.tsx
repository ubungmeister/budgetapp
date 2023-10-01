import { useCallback, useEffect, useState } from 'react';
import Select, { OptionProps } from 'react-select';

import no_image from '../../assets/images/no_image.png';
import { getAllGoals } from '../../compnents/cash-flow/api';
import { optionsExpense, optionsIncome } from './options';
import { CategotyTypeProps } from './types';
import { optionsGoalsProps } from './types';

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

const CategorySelector = ({
  category,
  setCategory,
  categoryType,
}: CategotyTypeProps) => {
  const [optionsGoals, setOptionsGoals] =
    useState<Array<optionsGoalsProps> | null>(null);

  useEffect(() => {
    const getGoals = async () => {
      const goals = await getAllGoals();
      const golasWithLabel = goals?.map((goal: any) => {
        return {
          label: goal.name,
          id: goal.id,
          src: '',
          currentAmount: goal.currentAmount,
          goalAmount: goal.goalAmount,
          isActive: goal.isActive,
        };
      });
      setOptionsGoals(golasWithLabel);
    };
    getGoals();
  }, []);

  // get value for select component
  const getValue = useCallback(() => {
    const optionIncome = optionsIncome.find(
      (c) => c.label === category.category
    );
    const optionExpense = optionsExpense.find(
      (c) => c.label === category.category
    );
    const optionGoals = optionsGoals?.find(
      (c: any) => c.label === category.category
    );

    return optionIncome || optionExpense || optionGoals;
  }, [setCategory, category]);

  const onChangeHandler = useCallback(
    (selectedOption: any) => {
      setCategory({
        category: selectedOption.label,
        saving_goal_Id: selectedOption.id || '',
      });
    },
    [setCategory]
  );

  let options: any = [];
  if (categoryType) {
    options =
      categoryType === 'Income'
        ? optionsIncome
        : categoryType === 'Expense'
        ? optionsExpense
        : optionsGoals || [];
  }

  return (
    <div>
      <Select
        placeholder="Category"
        classNamePrefix="Select"
        value={getValue() || null}
        isSearchable={false}
        onChange={onChangeHandler}
        options={options}
        components={{ Option: customOption }}
      />
    </div>
  );
};

export default CategorySelector;
