type MonthButtonProps = {
  month: Date | null;
};

const MonthButton = ({ month }: MonthButtonProps) => {
  return (
    <div className="text-center justify-center button-disabled px-2 min-w-[10rem] max-w-[8rem] mr-5 py-2">
      <p className="">
        {month?.toLocaleString('en-DE', {
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  );
};

export default MonthButton;
