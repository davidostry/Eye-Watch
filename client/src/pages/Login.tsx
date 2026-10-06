import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api/users";
import {useAuthStore} from "../store/authStore";
import "../style/login.css"

function Login() {
const navigate = useNavigate();


const setToken = useAuthStore((state) => state.setToken);

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
        setError("");

        const data = await login(username, password);

        setToken(data.token);

        navigate("/mainPage");
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        }
    }
}

return (
    <div className="login">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
            <input
                type="username"
                placeholder="please enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />

            <input
                type="password"
                placeholder="please enter Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">
                Login
            </button>
        </form>

        {error && <p>{error}</p>}

    </div>
);


}

export default Login;
