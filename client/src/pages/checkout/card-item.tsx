import { useContext } from "react";
import { IProduct } from "../../models/interface";
import { ShopContext } from "../../context/shop-context";

interface Props {
    product: IProduct;
}

export const CartItem = (props: Props) => {
    const {_id, imageURL, productName, price} = props.product;
    const {getCartItemCount, addToCart, removeFromCart, updateCartItemCount} = useContext(ShopContext)
    const cartItemCount = getCartItemCount(_id);
    return (
        <div className="cartItem">
       <img src={imageURL} alt="product"/>
        <div className="description">
            <h3> {productName} </h3>
            <p> Price: ${price} </p>
        </div>
        <div className="count-handler">
            <button onClick={() => removeFromCart(_id)}>
                -
            </button>
            <input
            type="number"
            value={cartItemCount}
            onChange={(e) => updateCartItemCount(Number(e.target.value), _id)}
            />
            <button onClick={() => addToCart(_id)}>
                +
            </button>
        </div>

    </div>
    )
};