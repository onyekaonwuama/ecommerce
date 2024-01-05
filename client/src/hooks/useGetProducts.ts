import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interface";
import { IShopContext, ShopContext } from "../context/shop-context";


export const useGetProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const { headers } = useGetToken();
    const {isAuthenticated} =useContext<IShopContext>(ShopContext)
    // function to get all products from the route in backend
    const fetchProducts = async () => {
        try {
            const fetchedProducts = await axios.get("http://localhost:3001/product", {headers});
            // set products state with the products returned
            setProducts(fetchedProducts.data.products);
        } catch (err) {
            alert("Error: Something went wrong.");
        }
    };

    // on page load call function.
    useEffect(() => {
        if (isAuthenticated) {
         fetchProducts();
        }
    }, [isAuthenticated]);

    return { products };
}