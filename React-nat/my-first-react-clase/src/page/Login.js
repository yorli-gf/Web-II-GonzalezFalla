import login from "../style/login.css"

export default function Login() {
    return (
        <div>
            <div className="containerLogin">
                <h3>Login</h3>
                <form className="formLogin">
                    <input className="login-input" type="text" name="User" placeholder="User" />
                    <input type="password" name="password" placeholder="Password" />
                    <div className="login-button-container">
                        <button className="login-button">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}