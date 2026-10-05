export type Priority =
    | "Low"
    | "Medium"
    | "High"
    | "Critical";

export type Arena =
    | "North"
    | "South"
    | "Center";

export type AlertStatus =
    | "Active"
    | "Handled";

export type Alert = {
    _id: string;
    displayName: string;
    description: string;
    priority: Priority;
    arena: Arena;
    status: AlertStatus;
    lon: number;
    lat: number;
};

export type AlertInput = {
    displayName: string;
    description: string;
    priority: Priority;
    arena: Arena;
    status: AlertStatus;
    lon: number;
    lat: number;
};