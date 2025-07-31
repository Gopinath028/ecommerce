import { useFilter } from "../../context/filter-context";
import { useEffect, useState } from "react";

const CategoryBar = () => {
  const { dispatch, state } = useFilter();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      .then((data) => setCategories([{ id: 0, name: "All" }, ...data]));
  }, []);
  

  return (
    <div className="flex flex-wrap gap-2 justify-center my-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => dispatch({ type: "SET_CATEGORY", payload: cat.name })}
          className={`px-4 py-1 rounded-full font-medium text-white ${
            state.selectedCategory === cat.name ? "bg-green-600" : "bg-green-400"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
