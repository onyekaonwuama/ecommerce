import { useContext } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import "./styles.scss";

export const PurchasedItemsPage = () => {
  const { purchasedItems, addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);

  return (
    <div className="purchased-items-page">
      <h1> Previously Purchased Items </h1>

      <div className="purchased-items">
        {purchasedItems.map((item) => {
          console.log("item", item)
          const cartItemCount = getCartItemCount(item._id);
          return (
            <div className="item">
              <img src={item.imageURL} alt={item.productName} />
              <h3> {item.productName} </h3>
              <p> ${item.price} </p>
              <button onClick={() => addToCart(item._id)}>
                Purchase Again {cartItemCount > 0 && <> ({cartItemCount})</>}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};