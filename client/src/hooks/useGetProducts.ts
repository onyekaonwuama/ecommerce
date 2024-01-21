import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interface";
import { IShopContext, ShopContext } from "../context/shop-context";

export const useGetProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { headers } = useGetToken();
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);
  // function to get all products from the route in backend
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const fetchedProducts = await axios.get("http://localhost:3002/product", {
        headers,
      });
      console.log({ fetchedProducts });
      // set products state with the products returned
      setProducts(fetchedProducts.data.products);
      
      // check authentication and fetched products
      if (isAuthenticated && fetchProducts) {
        setLoading(false)
      }
    } catch (err) {
      console.log("this is ugp err", err)
      alert("Error: Something went wrong. UGp");
    }
  };

  useEffect(() => {
    if (loading === false) {
    }
    fetchProducts();
  }, []);

  // console.log({ "product from useGetProducts": products });
  return { products, loading };
};
