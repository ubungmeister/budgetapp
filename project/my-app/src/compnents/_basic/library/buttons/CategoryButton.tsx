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
  console.log('category', category);
  return (
    <button
      disabled={selectedCashFlow ? true : false}
      onClick={() => onCategorySelectHandler(category)}
      className={`border-2 rounded-md px-1  bg-slate-100  ${
        selectedCashFlow?.category_type || categoryType === category
          ? 'border-green-400'
          : 'border-cyan-400'
      }`}
    >
      {category}
    </button>
  );
};

export default CategoryButton;
