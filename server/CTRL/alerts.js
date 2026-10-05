import { createAlert } from "../DAL/repository.js";

export async function addAlert(req, res){
    const {displayName, description, priority, arena, status, lon, lat} = req.body;
    const newAlert = await createAlert()
}