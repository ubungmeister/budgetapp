import { BiPencil } from 'react-icons/bi';

type ListItemsProps = {
  listOfItems: any[];
  selectedItemHandler: (item: any) => void;
};
const ListItems = ({ listOfItems, selectedItemHandler }: ListItemsProps) => {
  return (
    <div className="divide-solid divide-y">
      {listOfItems.map((item, index) => (
        <div
          className={`w-350px max-h-450px overflow-hidden flex flex-row justify-between items-center p-3 hover:bg-indigo-50
                ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
          key={item.id}
          onClick={() => selectedItemHandler(item)}
        >
          <p>{item.username ?? item.name}</p>
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
