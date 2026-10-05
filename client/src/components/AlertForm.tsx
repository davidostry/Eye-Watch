import { useEffect, useState } from "react";
import { useAlertStore } from "../store/alertStore";
import type { Alert, AlertInput, Priority, Arena, AlertStatus } from "../types/alert";

type AlertFormProps = {
    alert?: Alert | null;
    onDone: () => void;
};

function AlertForm({
    alert,
    onDone
}: AlertFormProps) {

    const addAlert = useAlertStore((state) => state.addAlert);
    const editAlert = useAlertStore((state) => state.editAlert);
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("Low");
    const [arena, setArena] = useState<Arena>("Center");
    const [status, setStatus] = useState<AlertStatus>("Active");
    const [lon, setLon] = useState("");
    const [lat, setLat] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {

        if (alert) {
            setDisplayName(alert.displayName);
            setDescription(alert.description);
            setPriority(alert.priority);
            setArena(alert.arena);
            setStatus(alert.status);
            setLon(String(alert.lon));
            setLat(String(alert.lat));

        } else {
            setDisplayName("");
            setDescription("");
            setPriority("Low");
            setArena("Center");
            setStatus("Active");
            setLon("");
            setLat("");
        }

        setError("");

    }, [alert]);

    function validate(): string | null {

        if (!displayName.trim()) {
            return "Display name is required";
        }

        if (!description.trim()) {
            return "Description is required";
        }

        if (!lon || !lat) {
            return "Longitude and latitude are required";
        }

        const longitude = Number(lon);
        const latitude = Number(lat);

        if (!Number.isFinite(longitude)) {
            return "Longitude must be a number";
        }

        if (!Number.isFinite(latitude)) {
            return "Latitude must be a number";
        }

        if (
            longitude < -180 ||
            longitude > 180
        ) {
            return "Longitude must be between -180 and 180";
        }

        if (
            latitude < -90 ||
            latitude > 90
        ) {
            return "Latitude must be between -90 and 90";
        }

        return null;
    }

    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault();

        const validationError =
            validate();

        if (validationError) {
            setError(validationError);
            return;
        }

        const data: AlertInput = {
            displayName:
                displayName.trim(),

            description:
                description.trim(),
            priority,
            arena,
            status,
            lon: Number(lon),
            lat: Number(lat)
        };

        try {

            if (alert) {

                await editAlert(
                    alert._id,
                    data
                );

            } else {

                await addAlert(data);

            }

            onDone();

        } catch {
            setError(
                "Operation failed"
            );
        }
    }

    return (
        <form
            className="alert-form"
            onSubmit={handleSubmit}
        >

            <h2>
                {alert
                    ? "Edit Alert"
                    : "Add Alert"}
            </h2>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            <label>
                Display Name

                <input
                    value={displayName}
                    onChange={(event) =>
                        setDisplayName(
                            event.target.value
                        )
                    }
                />
            </label>

            <label>
                Description

                <textarea
                    value={description}
                    onChange={(event) =>
                        setDescription(
                            event.target.value
                        )
                    }
                />
            </label>

            <label>
                Priority

                <select
                    value={priority}
                    onChange={(event) =>
                        setPriority(
                            event.target.value as Priority
                        )
                    }
                >
                    <option value="Low">
                        Low
                    </option>

                    <option value="Medium">
                        Medium
                    </option>

                    <option value="High">
                        High
                    </option>

                    <option value="Critical">
                        Critical
                    </option>
                </select>
            </label>

            <label>
                Arena

                <select
                    value={arena}
                    onChange={(event) =>
                        setArena(
                            event.target.value as Arena
                        )
                    }
                >
                    <option value="North">
                        North
                    </option>

                    <option value="South">
                        South
                    </option>

                    <option value="Center">
                        Center
                    </option>
                </select>
            </label>

            <label>
                Status

                <select
                    value={status}
                    onChange={(event) =>
                        setStatus(
                            event.target.value as AlertStatus
                        )
                    }
                >
                    <option value="Active">
                        Active
                    </option>

                    <option value="Handled">
                        Handled
                    </option>
                </select>
            </label>

            <label>
                Longitude

                <input
                    type="number"
                    step="any"
                    value={lon}
                    onChange={(event) =>
                        setLon(
                            event.target.value
                        )
                    }
                />
            </label>

            <label>
                Latitude

                <input
                    type="number"
                    step="any"
                    value={lat}
                    onChange={(event) =>
                        setLat(
                            event.target.value
                        )
                    }
                />
            </label>

            <div className="form-buttons">

                <button type="submit">
                    {alert
                        ? "Update"
                        : "Add"}
                </button>

                <button
                    type="button"
                    onClick={onDone}
                >
                    Cancel
                </button>

            </div>

        </form>
    );
}

export default AlertForm;