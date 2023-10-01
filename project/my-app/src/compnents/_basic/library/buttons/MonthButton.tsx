export interface PmType {
  month: Date;
  amount: number;
  userId: string;
  id?: string;
}
type MonthButtonProps = {
  data: PmType | undefined;
};

const MonthButton = ({ data }: MonthButtonProps) => {
  return (
    <div className="text-center justify-center button-disabled px-2 min-w-[10rem] max-w-[8rem] mr-5 py-2">
      <p className="">
        {data?.month.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </p>
    </div>
  );
};

export default MonthButton;
