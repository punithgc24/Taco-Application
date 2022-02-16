import React, {createContext, useState}from 'react'

const CartContext = createContext();

export default CartContext;

export const CartProvider = ({children}) => {

    const [cart, setCart] = useState([]);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

