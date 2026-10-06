import { create } from "zustand";

import {
    getAlerts,
    createAlert,
    updateAlert,
    deleteAlert
} from "../api/alerts";

import type {
    Alert,
    AlertInput
} from "../types/alert";

type AlertStore = {
    alerts: Alert[];
    loading: boolean;
    error: string | null;

    fetchAlerts: () => Promise<void>;

    addAlert: (
        alert: AlertInput
    ) => Promise<void>;

    editAlert: (
        id: string,
        alert: AlertInput
    ) => Promise<void>;

    removeAlert: (
        id: string
    ) => Promise<void>;
};

export const useAlertStore = create<AlertStore>(
    (set) => ({
        alerts: [],
        loading: false,
        error: null,

        fetchAlerts: async () => {
            try {
                set({
                    loading: true,
                    error: null
                });

                const alerts = await getAlerts();

                set({
                    alerts,
                    loading: false
                });
            } catch {
                set({
                    loading: false,
                    error: "Failed to load alerts"
                });
            }
        },

        addAlert: async (alert) => {
            try {
                set({
                    error: null
                });

                const newAlert =
                    await createAlert(alert);

                set((state) => ({
                    alerts: [
                        newAlert,
                        ...state.alerts
                    ]
                }));
            } catch {
                set({
                    error: "Failed to create alert"
                });

                throw new Error(
                    "Failed to create alert"
                );
            }
        },

        editAlert: async (id, alert) => {
            try {
                set({
                    error: null
                });

                const updatedAlert =
                    await updateAlert(
                        id,
                        alert
                    );

                set((state) => ({
                    alerts: state.alerts.map(
                        (item) =>
                            item._id === id
                                ? updatedAlert
                                : item
                    )
                }));
            } catch {
                set({
                    error: "Failed to update alert"
                });

                throw new Error(
                    "Failed to update alert"
                );
            }
        },

        removeAlert: async (id) => {
            try {
                set({
                    error: null
                });

                await deleteAlert(id);

                set((state) => ({
                    alerts: state.alerts.filter(
                        (item) =>
                            item._id !== id
                    )
                }));
            } catch {
                set({
                    error: "Failed to delete alert"
                });

                throw new Error(
                    "Failed to delete alert"
                );
            }
        }
    })
);