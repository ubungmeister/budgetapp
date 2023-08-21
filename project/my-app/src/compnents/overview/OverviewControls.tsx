import { OverviewControlsProps } from './types'

const OverviewControls = ({
  setIsMonthChange,
  pocketMoney,
}: OverviewControlsProps) => {
  return (
    <div className="mx-10">
      <div className="flex space-x-10 justify-center items-center mt-5">
        <button
          className=" button-month "
          onClick={() => setIsMonthChange('prev')}
        >
          Previous
        </button>

        <button
          className=" button-month "
          onClick={() => setIsMonthChange('next')}
        >
          Next
        </button>
        <div className="">
          {pocketMoney?.month.toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </div>
    </div>
  )
}

export default OverviewControls
