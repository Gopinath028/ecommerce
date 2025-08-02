import { Navbar } from "../../components/Navbar";
import { ProductCard } from "../../components/ProductCard";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/getAllProducts";
import { useCart } from "../../context/cart-context";
import { getAllCategories } from "../../api/getAllCategories";




export const Home = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { cart } = useCart();
    const [maxPrice, setMaxPrice] = useState(100);
    const [sortBy, setSortBy] = useState("");


    console.log(cart);

    useEffect(() => {
        (async () => {
            const products = await getAllProducts();
            const categories = await getAllCategories();
            const updatedCategories = [...categories, { id: '1a', name: 'All' }]
            setProducts(products);
            setCategories(updatedCategories);
        })()

    }, []);

    const onCategoryClick = (category) => {
        setSelectedCategory(category);

    }


    const filteredProducts = products
        .filter((product) =>
            selectedCategory === "All" ? true : product.category.name === selectedCategory
        )
        .filter((product) => product.price <= maxPrice)
        .sort((a, b) => {
            if (sortBy === "lowToHigh") return a.price - b.price;
            if (sortBy === "highToLow") return b.price - a.price;
            return 0;
        });


    return (
        <>
            <Navbar />
            <main className="pt-8 flex">
                {/* Sidebar */}
                <div className="w-64 px-4">
                    <div className="bg-gray-100 p-4 rounded shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Filters</h2>

                        {/* Price Range */}
                        <label className="block mb-2 font-medium">Price Range (up to ₹{maxPrice})</label>
                        <input
                            type="range"
                            min="1"
                            max="1000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full mb-4"
                        />

                        {/* Sort By Price */}
                        <div>
                            <h3 className="font-medium mb-2">Sort By Price</h3>
                            <label className="block mb-1">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="lowToHigh"
                                    checked={sortBy === "lowToHigh"}
                                    onChange={() => setSortBy("lowToHigh")}
                                />
                                <span className="ml-2">Low to High</span>
                            </label>
                            <label className="block">
                                <input
                                    type="radio"
                                    name="sort"
                                    value="highToLow"
                                    checked={sortBy === "highToLow"}
                                    onChange={() => setSortBy("highToLow")}
                                />
                                <span className="ml-2">High to Low</span>
                            </label>
                        </div>
                    </div>
                </div>

                
                <div className="flex-1">
                    
                    <div className="flex gap-4 justify-center mb-4 flex-wrap">
                        {categories?.length > 0 &&
                            categories.map((category) => (
                                <div
                                    key={category.id}
                                    className={`font-semibold rounded-full p-2 cursor-pointer ${selectedCategory === category.name
                                            ? "bg-green-600 text-white"
                                            : "bg-green-400"
                                        }`}
                                    onClick={() => onCategoryClick(category.name)}
                                >
                                    {category.name}
                                </div>
                            ))}
                    </div>

                    {/* Products */}
                    <div className="flex flex-wrap gap-8 justify-center">
                        {filteredProducts?.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <h2>No Products found. Please try with another filter.</h2>
                        )}
                    </div>
                </div>
            </main>

        </>
    )
}