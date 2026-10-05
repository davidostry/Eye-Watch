import { Router } from "express";
import { addAlert, findAlertById, findAllAlerts } from "../CTRL/alerts.js";

const router = Router();

router.post("/alerts", addAlert)

router.get("/alerts", findAllAlerts)

router.get("/alerts/:id", findAlertById)

export default router