import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart data from localStorage on component mount
    useEffect(() => {
        let existingCartItem = localStorage.getItem("cart");
        if (existingCartItem) setCart(JSON.parse(existingCartItem));
    }, []);

    // Add a clearCart function that can be called on logout
    const clearCart = () => {
        // Clear cart state
        setCart([]);
        // Remove cart data from localStorage
        localStorage.removeItem("cart");
    };

    return (
        <CartContext.Provider value={[cart, setCart, clearCart]}>
            {children}
        </CartContext.Provider>
    );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };