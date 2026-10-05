import { createAlert } from "../DAL/repository.js";
import { alertSchma } from "../schemas/alertSchema.js";

export async function addAlert(req, res){
    const result = alertSchma.safeParse(req.body);
    if (!result.success) throw new Error("missing details");
    const newAlert = await createAlert(result.data);
    if (!newAlert)throw new Error("failed to create alert");
    res.status(201).json({message:`alert created successfully, the alertId is ${newAlert.insertedId}`})
    
}