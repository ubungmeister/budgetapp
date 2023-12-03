import { useState } from 'react';
import Select from 'react-select';
import { Cell, Label, Legend, Pie, PieChart } from 'recharts';

import { OverviewGraphProps } from '../../../user-overview/types';

const options = [
  { value: 'Goals', label: 'Goals' },
  { value: 'Expense', label: 'Expense' },
  { value: 'Income', label: 'Income' },
];

const OverviewPieChart = ({ cashFlow, pocketMoney }: OverviewGraphProps) => {
  const [category, setCategory] = useState({
    value: 'Income',
    label: 'Income',
  });

  // go though each item in the array and create categories
  // go through each category and sum the amounts

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

  // adding pocket money to the array since it is not in the cashflow array
  if (category.value === 'Income') {
    categoryTotals.push({
      category: 'Pocket Money',
      totalAmount: pocketMoney,
    });
  }

  const categoryTotalsSum = categoryTotals.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#f3f4f6',
      outline: 'none',
    }),
  };

  //Barchaert shows the amount of money spend by category_type
  // First user chose from options which category he wants to see (dropdown)
  // Then we filter the array by category and inside the array we sum the amounts with the same category_type
  const COLORS = [
    '#FFBB28',
    '#27c662',
    '#54a3ab',
    '#FF8042',
    '#FF0000',
    '#0000FF',
  ];
  return (
    <div className="overview-performance">
      <div className="flex justify-between">
        <p className="pt-1">Pie-Chart</p>
        <Select
          placeholder="Category"
          classNamePrefix="Select"
          className="w-40 cursor-pointer"
          value={category}
          isSearchable={false}
          styles={customStyles}
          onChange={(e: any) => setCategory({ value: e.value, label: e.label })}
          options={options}
        />
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

export default OverviewPieChart;
