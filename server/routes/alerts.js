import { Router } from "express";
import { addAlert, editAlert, findAlertById, findAllAlerts, removeAlert } from "../CTRL/alerts.js";

const router = Router();

router.post("/alerts", addAlert);

router.get("/alerts", findAllAlerts);

router.get("/alerts/:id", findAlertById);

router.delete("/alerts/:id", removeAlert)

router.put("/alerts/:id", editAlert)

export default router;