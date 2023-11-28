import { RegisterPage } from "../register"
import { LoginPage } from "../login"

export const AuthPage = () => {
    return (
        <div className="auth">
            <RegisterPage />
            <LoginPage />
        </div>
    )
}