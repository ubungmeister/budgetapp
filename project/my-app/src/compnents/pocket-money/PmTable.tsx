import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { capitalizeFirstLetter } from '../_basic/helpers/utils';
import { PmGroupedData, PmTableProps } from './types';

const PmTable = ({
  monthsAndBudget,
  pocketMoney,
  users,
  setPocketMoney,
  setSaveDisabled,
  setSuccessAlert,
}: PmTableProps) => {
  const [groupedData, setGroupedData] = useState<PmGroupedData>({});

  useEffect(() => {
    // Group data by month and year
    const groupData = () => {
      const grouped: PmGroupedData = {};

      pocketMoney.forEach((item) => {
        const key = new Date(item.month).toISOString();
        if (grouped[key]) {
          grouped[key] += item.amount;
        } else {
          grouped[key] = item.amount;
        }
      });

      setGroupedData(grouped);
    };

    groupData();
  }, [pocketMoney]);

  const renderPocketMoneyInputs = () => {
    const userInputs = users.map((user) => {
      const userPocketMoney = pocketMoney?.filter(
        (entry) => entry.userId === user.id
      );

      const inputs = monthsAndBudget.map((monthEntry, index) => {
        const pocketMoneyEntry = userPocketMoney.find(
          (entry) => entry.month === monthEntry.month
        );
        const amount = pocketMoneyEntry ? pocketMoneyEntry.amount : 0;

        return (
          <div className="  w-[9.5em] text-center ">
            <input
              key={index}
              value={amount ?? 0}
              type="number"
              min={0}
              max={1000000}
              className=" min-w-[4rem] max-w-[4rem] md:max-w-[5rem] md:min-w-[5rem] border-2 border-info-content-light  p-1 "
              onChange={(e) => {
                handleInputChange(
                  parseFloat(e.target.value) || 0,
                  monthEntry.month,
                  user.id,
                  pocketMoneyEntry?.id
                );
                setSuccessAlert(false);
              }}
            />
          </div>
        );
      });

      return (
        <div className="pocket-money-table pt-2 items-center md:items-start">
          <p className="pocket-header">{user.username}</p>
          <p className="flex flex-col md:flex-row items-center gap-1.5 md:gap-0">
            {inputs}
          </p>
        </div>
      );
    });
    return userInputs;
  };

  const handleInputChange = (
    value: number,
    month: any,
    userId: any,
    pocketMoneyID?: string
  ) => {
    if (pocketMoneyID === undefined) {
      const newPocketMoneyEntry = {
        id: uuidv4(),
        amount: value,
        month,
        userId,
      };
      setPocketMoney([...pocketMoney, newPocketMoneyEntry]);
    } else {
      const updatedPocketMoney = pocketMoney.map((entry) => {
        if (entry.userId === userId && entry.month === month) {
          return { ...entry, amount: value };
        }
        return entry;
      });
      setPocketMoney(updatedPocketMoney);
    }
  };

  // verify if any month budget is exceeded and disable save button
  const isAnyMonthExceeded = monthsAndBudget.some((monthEntry) => {
    const month = new Date(monthEntry.month);
    const spendAmount = groupedData[month.toISOString()];
    setSaveDisabled(spendAmount > monthEntry.amount);
    return spendAmount > monthEntry.amount;
  });

  return (
    <div className="flex flex-row md:flex-col w-full items-center md:items-start">
      <div className="pocket-money-table pt-7">
        <div className="budget-header">
          <p className="budget-table-month">Month</p>
          <p className="md:pt-6 pt-0 pl-2 md:pl-0">Budget</p>
        </div>
        <div className="flex flex-col md:flex-row ">
          {monthsAndBudget.map((monthEntry, index) => {
            const month = new Date(monthEntry.month);
            const monthName = month.toLocaleString('default', {
              month: 'long',
            });
            const spendAmount = groupedData[month.toISOString()];
            return (
              <div key={index} className="budget-header">
                <div className="budget-table-month">
                  {capitalizeFirstLetter(monthName)}
                </div>
                <div className="md:pt-6 pt-0 ">
                  <span
                    className={`${
                      spendAmount > monthEntry.amount && 'text-red-600'
                    }`}
                  >
                    {spendAmount ?? 0}
                  </span>
                  /<span>{monthEntry.amount}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row md:flex-col p-0">
        {renderPocketMoneyInputs()}
      </div>
    </div>
  );
};

export default PmTable;
