import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../api/users";
import { useAuthStore } from "../store/authStore";
import "../style/register.css"

function Register() {
    const navigate = useNavigate();
    const [assignedArena, setAssignedArena] = useState("")
    const [role, setRole] = useState("")
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const token = useAuthStore((state) => state.token);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            return;
        }
    });

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        try {

            setError("");

            await register(
                userName,
                email,
                password,
                token
            );

            navigate("/login");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    }

    return (
        <div className="register">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                />

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
                <input
                    type="text"
                    placeholder="role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                />
                <input
                type="text"
                placeholder="assignedArena"
                value={assignedArena}
                onChange={(event) => setAssignedArena(event.target.value)}
                />

                <button type="submit">
                    Register
                </button>
            </form>

            {error && <p>{error}</p>}

            <button onClick={() => navigate("/login")}>
                Login
            </button>
        </div>
    );


}

export default Register;
