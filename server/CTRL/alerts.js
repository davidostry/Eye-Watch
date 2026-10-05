import { createAlert, getAllAlerts } from "../DAL/repository.js";
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
        console.log(allAlerts);

        if (!allAlerts) return res.status(500).json({ message: "failed to get all alerts" });
       
        console.log(allAlerts);
        
        res.json(allAlerts)

    } catch (error) {

        console.log(error);
        res.status(500).json({ message: "failed to get all alerts" });
    }

}
