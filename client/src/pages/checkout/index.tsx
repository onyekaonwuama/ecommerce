import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interface";
import { CartItem } from "./card-item";
import './styles.css';

export const CheckoutPage = () => {
    //get counts of items for each id in the cart
    const { getCartItemCount } = useContext<IShopContext>(ShopContext);
    const { products } = useGetProducts();
    return (
        <div className="cart">
            <div>
                <h1> Your Cart Items</h1>
            </div>
            <div className="cart">
                {products.map((product: IProduct) => {
                    if (getCartItemCount(product._id) !== 0) {
                        return <CartItem product={product}/>
                    }
                })}
            </div>
        </div>
    )
}