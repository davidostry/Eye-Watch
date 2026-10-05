import { Router } from "express";
import { addAlert, findAllAlerts } from "../CTRL/alerts.js";

const router = Router();

router.post("/alerts", addAlert)

router.get("/alerts", findAllAlerts)

export default router