import { useFilter } from "../../context/filter-context";

const PriceRange = () => {
  const { state, dispatch } = useFilter();
  return (
    <div className="mb-6">
      <label className="block font-medium mb-2">Price Range: ₹0 - ₹{state.price}</label>
      <input
        type="range"
        min={1}
        max={1000}
        value={state.price}
        onChange={(e) => dispatch({ type: "SET_PRICE", payload: e.target.value })}
        className="w-full"
      />
    </div>
  );
};

export default PriceRange;
