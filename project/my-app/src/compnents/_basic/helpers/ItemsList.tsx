import { GoalListProps } from '../../goals/types';
import ListItems from '../library/list-items/ListItems';
import SearchBox from '../library/search-box/SearchBox';

const ItemsList = ({
  items,
  setSelectedItem,
  setFormOpen,
  setSearch,
  itemName,
  isAdmin,
}: GoalListProps) => {
  const selectedItemHandler = (item: any) => {
    if (setSelectedItem) {
      setSelectedItem(item);
    }
    setFormOpen(true);
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };
  return (
    <div className=" pl-10 flex flex-col">
      <p className="text-[16px] py-2">
        <span className="text-green-700	">{items.length}</span> {itemName} found
      </p>
      <SearchBox onSearch={handleSearch} />

      <ListItems
        listOfItems={items}
        selectedItemHandler={selectedItemHandler}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default ItemsList;
