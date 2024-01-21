import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { UserErrors } from "../../errors";
import "../login/styles.scss";

export const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // handleSubmit submit on click
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3002/user/register", {
        username,
        password,
      });
      setUsername("");
      setPassword("");
      alert("Registration successful, now login");
    } catch (err) {
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
        <h2> Register </h2>
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
        <button type="submit"> Register </button>
      </form>
    </div>
  );
};
