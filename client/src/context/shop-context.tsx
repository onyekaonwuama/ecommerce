import { createContext, useState } from "react";

//create shopContext interface
export interface IShopContext {
    addToCart: (itemId: string) => void;
    removeFromCart: (itemId: string) => void;
    updateCartItemCount: (newAmount: number, itemId: string) => void;
    getCartItemCount: (itemId: string) => number;
}

//default value of interface would be the functions returning null
const defaultVal: IShopContext = {
    addToCart: () => null,
    removeFromCart: () => null,
    updateCartItemCount: () => null,
    getCartItemCount: () => 0,
};

export const ShopContext = createContext<IShopContext>(defaultVal);

//create a provider that wraps the the app and makes the context available for use
export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState<{ string: number } | {}>({});

    //to check amount of items of itemId in cat items
    const getCartItemCount= (itemId: string): number => {
        if (itemId in cartItems) {
            return cartItems[itemId]
        }
        return 0
    }

    const addToCart = (itemId: string) => {
        //checks if itemId exists in the cart items
        //if not it has just 1 as amt else it increases by 1
        console.log(itemId)
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1}));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    };

    const removeFromCart = (itemId: string) => {};
    const updateCartItemCount = (newAmount: number, itemId: string) => {};

    const contextValue: IShopContext = {
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getCartItemCount,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
            </ShopContext.Provider>

    )

}