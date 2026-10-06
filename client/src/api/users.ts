import axios from "axios";

import type {Alert,
    AlertInput
} from "../types/alert";

const api = axios.create({
    baseURL: "http://localhost:3001/api"
});

export async function getAlerts(): Promise<Alert[]> {
    const response = await api.get<Alert[]>("/alerts");

    return response.data;
}

export async function getAlertById(
    id: string
): Promise<Alert> {
    const response = await api.get<Alert>(`/alerts/${id}`);

    return response.data;
}

export async function createAlert(
    alert: AlertInput
): Promise<Alert> {
    const response = await api.post<Alert>(
        "/alerts",
        alert
    );

    return response.data;
}

export async function updateAlert(
    id: string,
    alert: AlertInput
): Promise<Alert> {
    const response = await api.put<Alert>(
        `/alerts/${id}`,
        alert
    );

    return response.data;
}

export async function deleteAlert(
    id: string
): Promise<void> {
    await api.delete(`/alerts/${id}`);
}