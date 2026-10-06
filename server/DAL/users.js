import { db } from "../DB/config.js";
import { ObjectId } from "mongodb";

const users = db.collection("users");

export async function createUser(user){
    return (await users.insertOne(user))
}

export async function getAllUsers(){
    return await users.find().toArray()
}

export async function getUserById(id){
    return await users.findOne({_id: new ObjectId(id)})
}

export async function getUserByEmail(email){
    return await users.findOne({email})
}

export async function deleteUser(id){
    return await users.deleteOne({_id: new ObjectId(id)})
}