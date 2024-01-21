import { createContext, useEffect, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { IProduct } from "../models/interface";
import { useGetToken } from "../hooks/useGetToken";
import axios from "axios";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";

//create shopContext interface
export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemCount: (newAmount: number, itemId: string) => void;
  getCartItemCount: (itemId: string) => number;
  getTotalCartAmount: () => number;
  checkout: () => void;
  availableMoney: number;
  purchasedItems: IProduct[];
  isAuthenticated: boolean;
  setIsAuthenticated: (isAAuthenticated: boolean) => void;
  getCountInCart: () => number;
}

//default value of interface would be the functions returning null
const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemCount: () => null,
  getCartItemCount: () => 0,
  getTotalCartAmount: () => 0,
  checkout: () => null,
  availableMoney: 0,
  purchasedItems: [],
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  getCountInCart: () => 0,
};

export const ShopContext = createContext<IShopContext>(defaultVal);

//create a provider that wraps the the app and makes the context available for use
export const ShopContextProvider = (props) => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    cookies.access_token !== null
  );
  const { products, loading } = useGetProducts();

  //get the token to pass as headers to the checkout api
  const { headers } = useGetToken();
  const navigate = useNavigate();

  //function to fetch available money for a user
  const fetchAvailableMoney = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3002/user/available-money/${localStorage.getItem(
          "userID"
        )}`,
        { headers }
      );
      setAvailableMoney(res.data.availableMoney);
      // console.log("this money", res.data.availableMoney)
    } catch (err) {
      // alert("ERROR: Something went wrong.")
      console.log(err);
    }
  };

  //function to purchased items for a user
  const fetchPurchasedItems = async () => {
    try {
      console.log({'item from storage': localStorage.getItem(
        "userID"
      )})
      const res = await axios.get(
        `http://localhost:3002/product/purchased-items/${localStorage.getItem(
          "userID"
        )}`,
        { headers }
      );
      console.log({res: res})
      setPurchasedItems(res.data.purchasedItems);
      // console.log("this money", res.data.availableMoney)
    } catch (err) {
      // console.log({"Error in used fetch purchased items": err})
      alert("ERROR: Something went wrong. fgp");
    }
  };
  //to check amount of items of itemId in cat items
  const getCartItemCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    }
    return 0;
  };

  const getCountInCart = (): number => {
    let totalCount = 0;

    //count the nummber of occurrence of the value of the itemid
    for (const key in cartItems) {
      if (cartItems.hasOwnProperty(key)) {
        const value = cartItems[key];
        totalCount += value;
      }
    }
    return totalCount;
  };

  const addToCart = (itemId: string) => {
    //checks if itemId exists in the cart items
    //if not it has just 1 as amt else it increases by 1
    console.log("this is added iteid", itemId);
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId: string) => {
    console.log("this is ", itemId);
    if (!cartItems[itemId]) return;
    if (cartItems[itemId] == 0) return;
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount: number, itemId: string) => {
    if (newAmount < 0) return;

    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const getTotalCartAmount = (): number => {
    if (products.length === 0) return 0;
    let totalAmount = 0;
    for (const item in cartItems) {
      console.log({ products });
      if (cartItems[item] > 0) {
        let itemInfo: IProduct = products.find(
          (product) => product._id === item
        );
        console.log("this is itemInfo", itemInfo);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const checkout = async () => {
    const body = { customerID: localStorage.getItem("userID"), cartItems };
    //make an async call to the checkout route in the server
    try {
      await axios.post("http://localhost:3002/product/checkout", body, {
        headers,
      });

      setCartItems({});
      fetchAvailableMoney();
      fetchPurchasedItems();
      getCountInCart();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

    //to clear storage and set cookies to null if not logged in
  //to be triggered upon change of status for isAuthenticated



  useEffect(() => {
    if (!isAuthenticated || localStorage.getItem("userID") === null) {
      setIsAuthenticated(false);
    }
    if (isAuthenticated) {
      fetchAvailableMoney();
      fetchPurchasedItems();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.clear();
      setCookies("access_token", null);
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);



  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getCartItemCount,
    getTotalCartAmount,
    checkout,
    availableMoney,
    purchasedItems,
    isAuthenticated,
    setIsAuthenticated,
    getCountInCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
