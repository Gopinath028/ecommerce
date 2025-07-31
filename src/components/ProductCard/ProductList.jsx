import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useFilter } from "../../context/filter-context";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { state } = useFilter();

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const filtered = products
    .filter((p) =>
      state.selectedCategory === "All" ? true : p.category.name === state.selectedCategory
    )
    .filter((p) => p.price <= state.price)
    .sort((a, b) => {
      if (state.sortBy === "lowToHigh") return a.price - b.price;
      if (state.sortBy === "highToLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {filtered.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
