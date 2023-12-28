import axios from "axios";
import { useEffect, useState } from "react";
import { useGetToken } from "./useGetToken";
import { IProduct } from "../models/interface";


export const useGetProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const { headers } = useGetToken();
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
        fetchProducts();
    }, []);

    return { products };
}