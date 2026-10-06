import { Router } from "express";
import { getUserDetails, login, register, removeUser, showAllUsers } from "../CTRL/users.js";
import { auth, authorization } from "../middleware/auth.js";

const router = Router();

router.post("/register",auth, authorization, register);

router.post("/login", login);

router.get("/me",auth, getUserDetails);

router.delete("/users/:id",auth, authorization, removeUser)

router.get("/users", auth, authorization, showAllUsers)

export default router