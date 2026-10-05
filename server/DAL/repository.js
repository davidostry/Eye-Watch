import { db } from "../DB/config.js";
import { ObjectId } from "mongodb";

const alerts = db.collection("alerts");

export async function createAlert(alert){
    return await alerts.insertOne(alert)
}

export async function getAllAlerts(){
    return await alerts.find().toArray()
}

export async function getAlertById(id){
    return await alerts.findOne({_id: new ObjectId(id)})
}

export async function updateAlert(id, update){
    return await alerts.updateOne({_id: new ObjectId(id)}, update)
}

export async function deleteAlert(id){
    return await alerts.deleteOne({_id: new ObjectId(id)})
}