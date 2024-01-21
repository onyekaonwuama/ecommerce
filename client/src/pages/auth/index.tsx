import { RegisterPage } from "../register";
import { LoginPage } from "../login";
import { useContext, useState } from "react";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { Navigate } from "react-router-dom";

export const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(true);
  const { isAuthenticated } = useContext<IShopContext>(ShopContext);

  const togglePage = () => {
    setShowRegister((prev) => !prev);
  };
//   if (isAuthenticated === true) {
//     return <Navigate to="/" />;
//   }
  return (
    <div className="auth">
      {showRegister ? <RegisterPage /> : <LoginPage />}
      <div className="toggle-link" onClick={togglePage}>
        {showRegister
          ? "Already have an account? Login"
          : "Don't have an account? Create an account"}
      </div>
    </div>
  );
};
