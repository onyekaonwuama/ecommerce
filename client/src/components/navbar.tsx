import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";
import { useCookies } from "react-cookie";

export const Navbar = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated } =
    useContext<IShopContext>(ShopContext);
  const [_, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setIsAuthenticated(false);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <h1> Tech Shop </h1>
        </div>
        {isAuthenticated && (
          <>
            <div className="right">
              <Link to="/" className="navText"> Shop </Link>
              <Link to="/purchased-items" className="navText"> Purchases </Link>
              <Link to="/checkout" className="navText">
                <FontAwesomeIcon icon={faShoppingCart} />
              </Link>
              <Link to="/auth" onClick={logout} className="navText">
                {" "}
                Logout{" "}
              </Link>
              <span className="navText"> ${availableMoney.toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
