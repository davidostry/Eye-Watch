import { Router } from "express";
import { addAlert, editAlert, findAlertById, findAllAlerts, removeAlert } from "../CTRL/alerts.js";

const router = Router();

router.post("/", addAlert);

router.get("/", findAllAlerts);

router.get("/:id", findAlertById);

router.delete("/:id", removeAlert)

router.put("/:id", editAlert)

export default router;