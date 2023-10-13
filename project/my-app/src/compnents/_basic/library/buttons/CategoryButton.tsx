import { CashFlowProps } from '../../../cash-flow/types';

type CategotyButtonProps = {
  selectedCashFlow: CashFlowProps | null;
  category: string;
  onCategorySelectHandler: (category: string) => void;
  categoryType: string;
};

const CategoryButton = ({
  selectedCashFlow,
  category,
  onCategorySelectHandler,
  categoryType,
}: CategotyButtonProps) => {
  return (
    <div>
      <button
        disabled={selectedCashFlow ? true : false}
        onClick={() => onCategorySelectHandler(category)}
        className={`border-2 rounded-md px-1  bg-slate-100 w-[109px] h-[40px]  ${
          selectedCashFlow?.category_type || categoryType === category
            ? 'border-info-content'
            : 'border-info-content-light'
        }`}
      >
        {category}
      </button>
    </div>
  );
};

export default CategoryButton;
