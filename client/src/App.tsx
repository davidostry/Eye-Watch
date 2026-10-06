import { Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/register";
import { useAuthStore } from "./store/authStore";
import MainPage from "./components/MainPage"

function ProtectedRoute({
    children
}: {
    children: React.ReactNode;
}) {
    const token = useAuthStore((state) => state.token);


    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;


}

function App() {
    return (<Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={
            <ProtectedRoute>
                <Register />
            </ProtectedRoute>
        }
        />
        <Route path="/mainPage" element={
            <ProtectedRoute>
                <MainPage />
            </ProtectedRoute>
        }
        />
    </Routes>
    );


}

export default App;
