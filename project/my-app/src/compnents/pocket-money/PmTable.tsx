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
          <div className="  min-w-[4rem] md:min-w-[7rem] lg:min-w-[10rem] text-center">
            <input
              key={index}
              value={amount ?? 0}
              type="number"
              min={0}
              max={1000000}
              className=" min-w-[4rem] max-w-[4rem] md:max-w-[5rem] md:min-w-[5rem] border-2 border-info-content-light  p-1"
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
        <div className="flex flex-row justify-stretch hover:bg-gray-50 py-4 pl-6">
          <p className="px-5 overflow-x-hidden text-ellipsis w-[7.5em] overflow-hidden">
            {user.username}
          </p>
          <div className="flex flex-row space-x-4 position-center">
            <p className="flex ">{inputs}</p>
          </div>
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
    <div className="flex flex-col w-full">
      <div className="flex md:flex-row flex-col items-center justify-center md:justify-start md:items-start pt-7 w-full pl-2">
        <div className="budget-header">
          <p className="budget-table-month">Month</p>
          <p className="pt-6">Budget</p>
        </div>
        <div className="flex flex-row ">
          {monthsAndBudget.map((monthEntry, index) => {
            const month = new Date(monthEntry.month);
            const monthName = month.toLocaleString('default', {
              month: 'long',
            });
            const spendAmount = groupedData[month.toISOString()];
            return (
              <div
                key={index}
                className="flex flex-col text-center space-y-2 min-w-[4rem] md:min-w-[7rem] lg:min-w-[10rem] my-4 divide-y"
              >
                <div className="center items-start pb-4 ">
                  {capitalizeFirstLetter(monthName)}
                </div>
                <div className="pt-6">
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
      <div>{renderPocketMoneyInputs()}</div>
    </div>
  );
};

export default PmTable;
