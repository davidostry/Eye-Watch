import { Router } from "express";
import { getUserDetails, login, register } from "../CTRL/users.js";
import { auth, authorization } from "../middleware/auth.js";

const router = Router()

router.post("/register",auth, authorization, register)

router.post("/login", login)

router.get("/me",auth, getUserDetails)

export default router