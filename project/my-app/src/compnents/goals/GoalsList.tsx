import ListItems from '../_basic/library/list-items/ListItems';
import SearchBox from '../_basic/library/search-box/SearchBox';
import { GoalListProps } from './types';

const GoalsList = ({
  items,
  setSelectedItem,
  setFormOpen,
  setSearch,
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
        <span className="text-green-700	">{items.length}</span> Goals found
      </p>
      <SearchBox onSearch={handleSearch} />

      <ListItems
        listOfItems={items}
        selectedItemHandler={selectedItemHandler}
      />
    </div>
  );
};

export default GoalsList;
