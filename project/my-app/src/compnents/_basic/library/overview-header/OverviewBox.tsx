import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { TiInfo } from 'react-icons/ti';
import { Tooltip as ReactTooltip } from 'react-tooltip';

type OverviewBoxProps = {
  amount: any;
  percentage?: number;
  difference?: number;
  img: string;
  text: Array<string>;
  boxType: string;
};

const OverviewBox = ({
  amount,
  percentage,
  img,
  text,
  boxType,
  difference,
}: OverviewBoxProps) => {
  // Generate a unique tooltip ID for each instance
  const tooltipId = `my-tooltip-${Math.random().toString(36).substring(7)}`;

  const isIncome = boxType === 'Income';
  const isGoals = boxType === 'Goals';
  const isExpense = boxType === 'Expense';
  const isTasks = boxType === 'Solved task';

  const notEnoghDataText = `Don't have enough data for current or previous month to analyze your progress`;

  const isPercentageAbsent =
    typeof percentage === 'undefined' || percentage === 0;
  const isDifferenceAbsent =
    typeof difference === 'undefined' || difference === 0;

  const isPercentage = (percentage: number) => {
    return (
      <>
        {percentage === 0 ? (
          <TiInfo style={{ color: '#54a3ab', fontSize: '24px' }} />
        ) : ((isIncome || isGoals) && percentage > 0) ||
          (isExpense && percentage < 0) ? (
          <AiFillCaretUp style={{ color: '#27c662', fontSize: '24px' }} />
        ) : (
          <AiFillCaretDown style={{ color: '#ef4949', fontSize: '24px' }} />
        )}

        {percentage !== 0 && (
          <p
            className={`text-sm pt-0.5 ${
              ((isIncome || isGoals) && percentage > 0) ||
              (isExpense && percentage < 0)
                ? 'text-info-green'
                : 'text-info-red'
            }`}
          >
            {percentage}%
          </p>
        )}
        <ReactTooltip id={tooltipId} aria-haspopup="true">
          <p>
            {percentage === 0 && isTasks
              ? text[0]
              : percentage === 0
              ? notEnoghDataText
              : percentage > 0
              ? text[0]
              : text[1]}
          </p>
        </ReactTooltip>
      </>
    );
  };

  const isDifference = (difference: number) => {
    return (
      <>
        {difference === 0 ? (
          <TiInfo style={{ color: '#54a3ab', fontSize: '24px' }} />
        ) : difference > 0 ? (
          <AiFillCaretUp style={{ color: '#27c662', fontSize: '24px' }} />
        ) : (
          <AiFillCaretDown style={{ color: '#ef4949', fontSize: '24px' }} />
        )}

        {difference !== 0 && (
          <p
            className={`text-sm pt-0.5 ${
              difference > 0 ? 'text-info-green' : 'text-info-red'
            }`}
          ></p>
        )}

        <ReactTooltip id={tooltipId} aria-haspopup="true">
          <p>
            {difference > 0
              ? `Solved ${difference} more  tasks this month than last month`
              : `Solved ${Math.abs(
                  difference
                )} fewer tasks this month than last month`}
          </p>
        </ReactTooltip>
      </>
    );
  };

  return (
    <div className="overview-box">
      <div className="flex flex-row space-x-4 min-w-[8rem]  items-center justify-center ">
        <img
          className="w-10 h-10 cursor-pointer rounded-full p-1"
          src={
            img ||
            'https://upload.wikimedia.org/wikipedia/commons/b/bd/Circle_Gainsboro.svg'
          }
          alt={''}
        />
      </div>
      <div className="text-center pt-3">
        <p className="text-2xl font-semibold">{amount}</p>
        <p className="text-gray-600 text-sm">{boxType} this month</p>
      </div>
      <div
        data-tooltip-id={tooltipId}
        className="flex flex-row justify-center pt-4 cursor-pointer"
      >
        {!isPercentageAbsent && isPercentage(percentage)}
        {!isDifferenceAbsent && isDifference(difference)}
        {isDifferenceAbsent && isPercentageAbsent && (
          <>
            <TiInfo style={{ color: '#54a3ab', fontSize: '24px' }} />
            <ReactTooltip id={tooltipId} aria-haspopup="true">
              <p>Not enough data</p>
            </ReactTooltip>
          </>
        )}
      </div>
    </div>
  );
};

export default OverviewBox;
