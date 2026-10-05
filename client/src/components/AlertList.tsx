import AlertCard from "./AlertCard";

import type { Alert } from "../types/alert";

type AlertListProps = {
    alerts: Alert[];
    onSelect: (alert: Alert) => void;
    onEdit: (alert: Alert) => void;
    onDelete: (id: string) => void;
};

function AlertList({
    alerts,
    onSelect,
    onEdit,
    onDelete
}: AlertListProps) {

    if (alerts.length === 0) {
        return (
            <p>
                No alerts found
            </p>
        );
    }

    return (
        <div className="alert-list">

            {alerts.map((alert) => (

                <AlertCard
                    key={alert._id}
                    alert={alert}
                    onSelect={() =>
                        onSelect(alert)
                    }
                    onEdit={() =>
                        onEdit(alert)
                    }
                    onDelete={() =>
                        onDelete(alert._id)
                    }
                />

            ))}

        </div>
    );
}

export default AlertList;