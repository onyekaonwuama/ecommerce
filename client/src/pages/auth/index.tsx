import { RegisterPage } from "../register";
import { LoginPage } from "../login";
import { useState } from "react";

export const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(true);

  const togglePage = () => {
    setShowRegister((prev) => !prev);
  };
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
