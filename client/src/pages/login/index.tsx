import { useState, SyntheticEvent, useContext } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { UserErrors } from "../../errors";
import { useNavigate } from "react-router";
import { IShopContext, ShopContext } from "../../context/shop-context";
import "./styles.scss";
export const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext<IShopContext>(ShopContext);

  // handleSubmit submit on click
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const result = await axios.post("http://localhost:3002/user/login", {
        username,
        password,
      });
      // set the cookies to be the token returned from the backend
      setCookies("access_token", result.data.token);
      // set/save the userID in the local storage
      localStorage.setItem("userID", result.data.userID);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.log({err})
      // create switches for multiple error cases
      // Log the error response type
      // console.log("Error response type:", err?.response?.data?.type);
      let errorMessage: string = "";
      switch (err?.response?.data?.type) {
        case UserErrors.No_USER_FOUND:
          errorMessage = "User doesn't exist";
          break;
        case UserErrors.WRONG_CREDENTIALS:
          errorMessage = "Wrong username/password combination";
          break;
        default:
          errorMessage = "Something went wrong";
      }

      alert("ERROR: " + errorMessage);

      if (err?.response?.data?.type === UserErrors.USERNAME_ALREADY_EXISTS) {
        alert("Error: Username already in use.");
      } else {
        alert("ERROR: Something went wrong.");
      }
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2> Login </h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit"> Login </button>
      </form>
    </div>
  );
};
