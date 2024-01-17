import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interface";
import { CartItem } from "./card-item";
import './styles.scss';
import { useNavigate } from "react-router";

export const CheckoutPage = () => {
    //get counts of items for each id in the cart
    const { getCartItemCount, getTotalCartAmount, checkout } = useContext<IShopContext>(ShopContext);
    const { products } = useGetProducts();
    const navigate = useNavigate();

    const totalAmount = getTotalCartAmount()
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
            <div className="checkout">
                <p> Subtotal: {totalAmount.toFixed(2)}$</p>
                <div className="buttonCase">
                <button onClick={(() => navigate("/"))}> Continue Shopping </button>
                <button onClick={checkout}> Checkout </button>
                </div>
                
            </div>
        </div>
    )
}