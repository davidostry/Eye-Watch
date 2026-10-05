import { db } from "../DB/config";
import { ObjectId } from "mongodb";

const alerts = db.collection("alerts");

export async function createAlert(alert){
    return alerts.insertOne(alert)
}

export async function getAllAlerts(){
    return alerts.find().toArray()
}

export async function getAlertById(id){
    return alerts.findOne({_id: new ObjectId(id)})
}

export async function updateAlert(id, update){
    return alerts.updateOne({_id: ObjectId(id)}, update)
}

export async function deleteAlert(id){
    return alerts.deleteOne({_id: ObjectId(id)})
}