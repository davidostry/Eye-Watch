import { Router } from "express";
import { addAlert } from "../CTRL/alerts.js";

const router = Router();

router.post("/alerts", addAlert)

export default router