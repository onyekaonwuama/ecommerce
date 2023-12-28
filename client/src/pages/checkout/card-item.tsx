import { useContext } from "react";
import { IProduct } from "../../models/interface";
import { ShopContext } from "../../context/shop-context";

interface Props {
    product: IProduct;
}

export const CartItem = (props: Props) => {
    const {_id, imageURL, productName, price} = props.product;
    const {getCartItemCount, addToCart, removeFromCart, updateCartItemCount} = useContext(ShopContext)
    return (
        <div className="cartItem">
       <img src={imageURL} alt="product"/>
            <div className="description">
                <h3> {productName} </h3>
                <p> Price: ${price} </p>
            </div>
    </div>
    )
};