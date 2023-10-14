import { useState } from 'react';
import Select from 'react-select';
import { Cell, Label, Legend, Pie, PieChart } from 'recharts';

import {
  expenseCalculation,
  goalsCalculation,
  incomeCalculation,
} from '../_basic/helpers/utils';
import { OverviewGraphProps } from './types';

const options = [
  { value: 'Goals', label: 'Goals' },
  { value: 'Expense', label: 'Expense' },
  { value: 'Income', label: 'Income' },
];

const OverviewGraph = ({ cashFlow, pocketMoney }: OverviewGraphProps) => {
  const [category, setCategory] = useState({
    value: 'Income',
    label: 'Income',
  });
  const sortedCashFlowByDate = cashFlow.sort(function (a, b) {
    const dateA = new Date(a.start_date);
    const dateB = new Date(b.start_date);

    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
      // Handle invalid dates
      return 0;
    }

    return dateB.getTime() - dateA.getTime();
  });
  const amounts = sortedCashFlowByDate.map((item) => item.amount);

  const expense = expenseCalculation(sortedCashFlowByDate);
  const income = incomeCalculation(amounts);
  const totalIncome = income + (pocketMoney?.amount || 0);
  const goals = goalsCalculation(sortedCashFlowByDate) * -1;

  // go though each item in the array and create categories
  // go through each category and sum the amounts
  const categories = [] as Array<string>;
  for (let i = 0; i < cashFlow.length; i++) {
    // cashFlow[i].category_type.includes(categories)
    !categories.includes(cashFlow[i].category_type) &&
      categories.push(cashFlow[i].category_type);
  }

  const dataCategoryType = cashFlow.filter(
    (categoty) => categoty.category_type === category.value
  );

  const uniqueCategories = Array.from(
    new Set(dataCategoryType.map((item) => item.category))
  );

  const categoryTotals = uniqueCategories.map((category) => {
    const totalAmount = dataCategoryType
      .filter((item) => item.category === category)
      .reduce((sum, item) => sum + item.amount, 0);

    const absoluteTotalAmount = Math.abs(totalAmount);

    return { category, totalAmount: absoluteTotalAmount };
  });

  const categoryTotalsSum = categoryTotals.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#f3f4f6', // Change this to your desired background color
      outline: 'none',
    }),
  };

  //Barchaert shows the amount of money spend by category_type
  // First user chose from options which category he wants to see (dropdown)
  // Then we filter the array by category and inside the array we sum the amounts with the same category_type
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#FF0000',
    '#0000FF',
  ];
  console.log('categoryTotals', categoryTotals);
  return (
    <div className="overview-performance">
      <div className="flex justify-between">
        <p className="pt-1">Pie-Chart</p>
        <div>
          <Select
            placeholder="Category"
            classNamePrefix="Select"
            className="w-40 "
            value={category}
            isSearchable={false}
            styles={customStyles}
            onChange={(e: any) =>
              setCategory({ value: e.value, label: e.label })
            }
            options={options}
          />
        </div>
      </div>

      <PieChart width={360} height={300}>
        <Pie
          data={categoryTotals}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="totalAmount"
          label={(entry: any) => `${entry.totalAmount} €`}
        >
          <Label value={categoryTotalsSum + '€'} position="center" />

          {categoryTotals.map((category, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              fontSize={12}
              fontWeight="bold"
            />
          ))}
        </Pie>
        <Legend
          payload={categoryTotals.map((category, index) => ({
            id: category.category,
            type: 'circle',
            value: category.category,
            color: COLORS[index % COLORS.length],
            fontSize: 8,
          }))}
          iconSize={8}
          layout="horizontal"
          align="left"
        />
      </PieChart>
    </div>
  );
};

export default OverviewGraph;
