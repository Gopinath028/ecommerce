import PriceRange from "./PriceRange";
import SortByPrice from "./SortByPrice";

const FilterSidebar = () => {
  return (
    <div className="w-64 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <PriceRange />
      <SortByPrice />
    </div>
  );
};

export default FilterSidebar;
