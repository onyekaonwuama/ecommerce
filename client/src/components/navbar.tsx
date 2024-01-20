import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";
import { useCookies } from "react-cookie";

interface Props {
  user: boolean;
}

export const Navbar = (props:Props) => {
  const { getCountInCart, availableMoney, isAuthenticated, setIsAuthenticated } =
    useContext<IShopContext>(ShopContext);
  const [_, setCookies] = useCookies(["access_token"]);
  const totalCount = getCountInCart();
  const logout = () => {
    setIsAuthenticated(false);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
        <Link to="/" className="logo"> AdTech </Link>
        </div>
        {isAuthenticated && (
          <>
            <div className="right">
              <Link to="/" className="navText"> Shop </Link>
              <Link to="/purchased-items" className="navText"> Purchases </Link>
              <Link to="/checkout" className="navMob shoppingCart">
                <FontAwesomeIcon icon={faShoppingCart} />
                {totalCount > 0 && <span className="countCart">{totalCount}</span>}
              </Link>
              <Link to="/auth" onClick={logout} className="navMob">
                Logout
              </Link>
              <span className="navMob"> ${availableMoney.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
