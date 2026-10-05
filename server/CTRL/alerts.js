import { createAlert } from "../DAL/repository.js";
import { alertSchma } from "../schemas/alertSchema.js";

export async function addAlert(req, res) {
    const result = alertSchma.safeParse(req.body);
    if (!result.success) return res.status(400).json({message:"missing details"});
    const newAlert = await createAlert(result.data);
    if (!newAlert) return res.status(500).json({message:"failed to create alert"});
    res.status(201).json({ message: `alert created successfully, the alertId is ${newAlert.insertedId}` })

}