import { createAlert, deleteAlert, getAlertById, getAllAlerts, updateAlert } from "../DAL/repository.js";
import { alertSchma } from "../schemas/alertSchema.js";

export async function addAlert(req, res) {
    try {

        const result = alertSchma.safeParse(req.body);
        if (!result.success) return res.status(400).json({ message: "missing details" });
        const newAlert = await createAlert(result.data);
        if (!newAlert) return res.status(500).json({ message: "failed to create alert" });
        res.status(201).json({ message: `alert created successfully, the alertId is ${newAlert.insertedId}` })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed to create alert" });
    }
}

export async function findAllAlerts(req, res) {
    try {
        const allAlerts = await getAllAlerts()
        if (!allAlerts) return res.status(500).json({ message: "failed to get all alerts" });
        res.json(allAlerts)

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "failed to get all alerts" });
    }

}

export async function findAlertById(req, res) {
    try {

        const { id } = req.params;
        const alert = await getAlertById(id);
        if (!alert) return res.status(404).json({ message: "alert not found" });
        res.json(alert)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed to get the alert" });

    }
}

export async function removeAlert(req, res) {
    try {
        const { id } = req.params;
        const alert = await getAlertById(id);
        if (!alert) return res.status(404).json({ message: "alert not found" });
        await deleteAlert(id);
        res.sendStatus(204)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed to delete the alert" });
    }
}

export async function editAlert(req, res) {
    try {

        const { id } = req.params;
        const alert = await getAlertById(id);
        if (!alert) return res.status(404).json({ message: "alert not found" });
        const result = alertSchma.safeParse(req.body);
        if (!result.success) return res.status(400).json({ message: "missing details" });

        const updated = await updateAlert(id, result.data)
        if (!updated) return res.status(500).json({ message: "failed to update the alert" });
        res.json(updated)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed to update the alert" });
    }

}