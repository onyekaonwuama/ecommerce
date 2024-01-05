import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useGetProducts } from "../../hooks/useGetProducts"
import { Product } from "./product";
import "./styles.css";
import { IShopContext, ShopContext } from "../../context/shop-context";

export const ShopPage = () => {
    const {products} = useGetProducts();
    const {isAuthenticated} = useContext<IShopContext>(ShopContext);

    // navigate to auth page if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/auth"/>
    }
    return (
    <div className="shop">
        <div className="products">{products.map(product => (
            <Product key={product._id} product={product}/>
        ))}
        </div>
    </div>)
}

