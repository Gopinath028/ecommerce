import { createContext, useContext, useReducer, useState } from "react";
import { cartReducer } from "../reducers/cartReducer";


const CartContext = createContext();

const CartProvider = ({children}) => {

    const initialState = {
        cart: [],
        wishlist: []
    }

    const [{cart, wishlist}, cartDispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{cart, wishlist, cartDispatch}}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext);

export { CartProvider, useCart}