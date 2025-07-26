import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { WishList } from "./pages/WishList";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home/>}/>
      <Route path="/cart" element={ <Cart/>}/>
      <Route path="/wishlist" element={<WishList/>}/>
    </Routes>
  );
}

export default App;
