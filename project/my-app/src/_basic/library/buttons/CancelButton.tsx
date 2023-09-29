import { TfiBackLeft } from 'react-icons/tfi';

type CancelButtonProps = {
  setChangeCancel?: (value: React.SetStateAction<boolean>) => void;
  setFormOpen?: (value: React.SetStateAction<boolean>) => void;
};

const CancelButton = ({ setChangeCancel, setFormOpen }: CancelButtonProps) => {
  return (
    <div>
      <button
        className="button-empty flex flex-row space-x-2 button-month px-5 py-2"
        onClick={() => {
          setChangeCancel?.(true);
          setFormOpen?.(false);
        }}
      >
        <div className="py-1">
          <TfiBackLeft />
        </div>
        <span>Cancel</span>
      </button>
    </div>
  );
};

export default CancelButton;
