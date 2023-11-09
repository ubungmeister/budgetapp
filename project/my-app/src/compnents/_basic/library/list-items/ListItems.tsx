import { BiPencil } from 'react-icons/bi';

type ListItemsProps = {
  listOfItems: any[];
  selectedItemHandler: (item: any) => void;
  isAdmin?: boolean;
};
const ListItems = ({
  listOfItems,
  selectedItemHandler,
  isAdmin,
}: ListItemsProps) => {
  const bgColor = (status: string, index: number) => {
    switch (status) {
      case 'PENDING':
        return index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
      case 'ON_REVIEW':
        return 'bg-yellow-50';
      case 'APPROVED':
        return 'bg-green-50';
      case 'DECLINED':
        return 'bg-red-50';
      default:
        return index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
    }
  };

  return (
    <div className="divide-solid divide-y">
      {listOfItems.map((item, index) => (
        <div
          className={`w-350px max-h-450px overflow-hidden flex flex-row justify-between items-center p-3 hover:bg-indigo-50
                ${bgColor(item.status, index)}`}
          key={item.id}
          onClick={() => selectedItemHandler(item)}
        >
          <p className="w-20 overflow-hidden truncate">
            {item.username ?? item.name}
          </p>
          {isAdmin && item.status === 'ON_REVIEW' && (
            <p className="text-gray-500">review-ready</p>
          )}
          <BiPencil
            style={{
              color: '#54a3ab',
              cursor: 'pointer',
              fontSize: '20px',
              paddingLeft: '2px',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ListItems;
