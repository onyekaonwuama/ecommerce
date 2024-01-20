import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { useGetProducts } from "../../hooks/useGetProducts"
import { Product } from "./product";
import { LoadingComponent } from "../loadingComponent";
import "./styles.scss";
import { IShopContext, ShopContext } from "../../context/shop-context";

export const ShopPage = () => {
    const {products, loading} = useGetProducts();
    const {isAuthenticated} = useContext<IShopContext>(ShopContext);

    // navigate to auth page if not authenticated
    console.log({isAuthenticated})
    if (!isAuthenticated) {
        return <Navigate to="/auth"/>
    }

    return (
    <div className="shop">
        {loading ? (
            <LoadingComponent/>
        ) : (
            <div className="products">{products.map(product => (
                <Product key={product._id} product={product}/>
            ))}
            </div>
        )}  
    </div>)
}

