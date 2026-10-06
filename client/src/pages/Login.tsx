import { useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../api/users";
import {useAuthStore} from "../store/authStore";

function Login() {
const navigate = useNavigate();


const setToken = useAuthStore((state) => state.setToken);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
        setError("");

        const data = await login(email, password);

        setToken(data.token);

        navigate("/tasks");
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        }
    }
}

return (
    <div>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">
                Login
            </button>
        </form>

        {error && <p>{error}</p>}

        <button onClick={() => navigate("/register")}>
            Register
        </button>
    </div>
);


}

export default Login;
