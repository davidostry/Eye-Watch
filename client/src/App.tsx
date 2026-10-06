
import { useEffect, useMemo, useState } from "react";
import { useAlertStore } from "./store/alertStore";

import AlertForm from "./components/AlertForm";
import AlertList from "./components/AlertList";
import AlertDetails from "./components/AlertDetails";
import Filters from "./components/Filters";
import AlertsMap from "./components/AlertsMap";

import type {
    Alert,
    Arena,
    Priority
} from "./types/alert";

function App() {
    const alerts = useAlertStore(
        (state) => state.alerts
    );

    const loading = useAlertStore(
        (state) => state.loading
    );

    const error = useAlertStore(
        (state) => state.error
    );

    const fetchAlerts = useAlertStore(
        (state) => state.fetchAlerts
    );

    const removeAlert = useAlertStore(
        (state) => state.removeAlert
    );

    const [search, setSearch] = useState("");

    const [arena, setArena] =
        useState<Arena | "">("");

    const [priority, setPriority] =
        useState<Priority | "">("");

    const [selectedAlert, setSelectedAlert] =
        useState<Alert | null>(null);

    const [editingAlert, setEditingAlert] =
        useState<Alert | null>(null);

    const [showForm, setShowForm] =
        useState(false);

    useEffect(() => {
        fetchAlerts();
    }, [fetchAlerts]);

    const filteredAlerts = useMemo(() => {
        return alerts.filter((alert) => {
            const matchesSearch =
                alert.displayName
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesArena =
                !arena ||
                alert.arena === arena;

            const matchesPriority =
                !priority ||
                alert.priority === priority;

            return (
                matchesSearch &&
                matchesArena &&
                matchesPriority
            );
        });
    }, [
        alerts,
        search,
        arena,
        priority
    ]);

    async function handleDelete(id: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this alert?"
        );

        if (!confirmed) {
            return;
        }

        await removeAlert(id);

        if (selectedAlert?._id === id) {
            setSelectedAlert(null);
        }
    }

    function handleEdit(alert: Alert) {
        setEditingAlert(alert);
        setShowForm(true);
        setSelectedAlert(null);
    }

    function handleAdd() {
        setEditingAlert(null);
        setShowForm(true);
    }

    function closeForm() {
        setShowForm(false);
        setEditingAlert(null);
    }

    return (
        <div className="app">

            <header className="header">
                <h1>
                    Eye Watch
                </h1>

                <button onClick={handleAdd}>
                    Add Alert
                </button>
            </header>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            <Filters
                search={search}
                arena={arena}
                priority={priority}
                onSearchChange={setSearch}
                onArenaChange={setArena}
                onPriorityChange={setPriority}
            />

            <div className="main-layout">

                <section className="alerts-section">

                    <h2>
                        Alerts
                    </h2>

                    {loading ? (
                        <p>
                            Loading...
                        </p>
                    ) : (
                        <AlertList
                            alerts={filteredAlerts}
                            onSelect={setSelectedAlert}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}

                </section>

                <section className="map-section">

                    <h2>
                        Map
                    </h2>

                    <AlertsMap
                        alerts={filteredAlerts.map(
                            (alert) => ({
                                id: alert._id,
                                displayName:
                                    alert.displayName,
                                priority:
                                    alert.priority,
                                lon: Number(
                                    alert.lat
                                ),
                                lat: Number(
                                    alert.lon
                                )
                            })
                        )}
                    />
                    

                </section>

            </div>

            {selectedAlert && (
                <AlertDetails
                    alert={selectedAlert}
                    onClose={() =>
                        setSelectedAlert(null)
                    }
                />
            )}

            {showForm && (
                <div className="modal">

                    <div className="modal-content">

                        <AlertForm
                            alert={editingAlert}
                            onDone={closeForm}
                        />

                    </div>

                </div>
            )}

        </div>
    );
}

export default App;

