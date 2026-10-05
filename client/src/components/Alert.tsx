import { useEffect, useState } from "react";
import { createAlert, type Alert } from "../api/api";
import useStore from '../store/useStore';

function Alert() {

const alert = useStore((state) => state.alert);
const setAlert = useStore((state)=> state.setAlert)

const [alert, setAlert] = useState<Alert[]>([]);
const [title, setTitle] = useState("");
const [error, setError] = useState("");

useEffect(() => {




async function handleCreateAlert(
    event: React.FormEvent
) {
    event.preventDefault();


    try {
        const created = await createAlert(
            
            title,
            false
        );

        setAlert((currentAlert) => [
            ...currentAlert,
            created
        ]);

        setTitle("");
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        }
    }
}



return (
    <div>
        <h1>Tasks</h1>

        {user && (
            <div>
                <p>Username: {user.userName}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
        )}

        <button onClick={logout}>
            Logout
        </button>

        <hr />

        <form onSubmit={handleCreateTask}>
            <input
                value={title}
                placeholder="Task title"
                onChange={(event) =>
                    setTitle(event.target.value)
                }
            />

            <button type="submit">
                Add Task
            </button>
        </form>

        {error && <p>{error}</p>}

        <ul>
            {tasks.map((task) => (
                <li key={task._id}>
                    {task.title} -{" "}
                    {task.completed
                        ? "Completed"
                        : "Not completed"}
                </li>
            ))}
        </ul>
    </div>
);


}

export default Alert;
