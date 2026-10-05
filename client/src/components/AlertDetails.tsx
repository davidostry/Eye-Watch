import type { Alert } from "../types/alert";

type AlertDetailsProps = {
    alert: Alert;
    onClose: () => void;
};

function AlertDetails({
    alert,
    onClose
}: AlertDetailsProps) {

    return (
        <div className="details">

            <div className="details-header">

                <h2>
                    Alert Details
                </h2>

                <button
                    onClick={onClose}
                >
                    X
                </button>

            </div>

            <p>
                <strong>
                    Name:
                </strong>{" "}
                {alert.displayName}
            </p>

            <p>
                <strong>
                    Description:
                </strong>{" "}
                {alert.description}
            </p>

            <p>
                <strong>
                    Priority:
                </strong>{" "}
                {alert.priority}
            </p>

            <p>
                <strong>
                    Arena:
                </strong>{" "}
                {alert.arena}
            </p>

            <p>
                <strong>
                    Status:
                </strong>{" "}
                {alert.status}
            </p>

            <p>
                <strong>
                    Longitude:
                </strong>{" "}
                {alert.lon}
            </p>

            <p>
                <strong>
                    Latitude:
                </strong>{" "}
                {alert.lat}
            </p>

        </div>
    );
}

export default AlertDetails;