import { MongoClient } from "mongodb";
import 'dotenv/config';

const client = new MongoClient(process.env.MONGO_URL);

try {
    client.connect()
    console.log("mongodb connected");

} catch (error) {
    console.log("failed to connect to mongodb");
    process.exit(1)
}

const db = client.db("tzofiaEye")

export {db}