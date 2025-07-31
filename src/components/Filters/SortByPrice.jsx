import { useFilter } from "../../context/filter-context";

const SortByPrice = () => {
  const { state, dispatch } = useFilter();

  return (
    <div>
      <h3 className="font-medium mb-2">Sort By Price</h3>
      <div className="flex flex-col gap-2">
        <label>
          <input
            type="radio"
            name="sort"
            value="lowToHigh"
            checked={state.sortBy === "lowToHigh"}
            onChange={() => dispatch({ type: "SET_SORT", payload: "lowToHigh" })}
          />
          <span className="ml-2">Low to High</span>
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="highToLow"
            checked={state.sortBy === "highToLow"}
            onChange={() => dispatch({ type: "SET_SORT", payload: "highToLow" })}
          />
          <span className="ml-2">High to Low</span>
        </label>
      </div>
    </div>
  );
};

export default SortByPrice;
