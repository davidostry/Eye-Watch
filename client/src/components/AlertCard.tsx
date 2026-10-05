import type { Alert } from "../types/alert";

type AlertCardProps = {
    alert: Alert;
    onSelect: () => void;
    onEdit: () => void;
    onDelete: () => void;
};

function AlertCard({
    alert,
    onSelect,
    onEdit,
    onDelete
}: AlertCardProps) {

    return (
        <div className="alert-card">

            <div
                onClick={onSelect}
                className="alert-content"
            >

                <h3>
                    {alert.displayName}
                </h3>

                <p>
                    {alert.description}
                </p>

                <div className="alert-info">

                    <span>
                        Priority:{" "}
                        {alert.priority}
                    </span>

                    <span>
                        Arena:{" "}
                        {alert.arena}
                    </span>

                    <span>
                        Status:{" "}
                        {alert.status}
                    </span>

                </div>

            </div>

            <div className="card-buttons">

                <button
                    onClick={onEdit}
                >
                    Edit
                </button>

                <button
                    onClick={onDelete}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default AlertCard;