
import { getUserByEmail, createUser } from "../DAL/users.js";
import { userSchma } from "../schemas/userSchema.js";
import { checkPassword, hashPassword } from "../service/bcrypt.js";
import { generateToken } from "../service/jwt.js";

export async function register(req, res) {
    try {
        const result = userSchma.safeParse(req.body);
        if (!result.success) return res.status(400).json({ message: "missing details" });
        const existsUser = await getUserByEmail(result.data.email);
        if (existsUser) return res.status(209).json({ message: "user already exists" });
        const hash = await hashPassword(result.data.password);
        const user = {
            username: result.data.username,
            hash,
            email: result.data.email,
            role: result.data.role,
            assignedArena: result.data.assignedArena
        }
        await createUser(user);
        res.status(201).json({ message: "user created succesfully" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error" })

    }





}

export async function login(req, res) {
    const result = userSchma.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "missing details" });
    const existsUser = await getUserByEmail(result.data.email);
    if (!existsUser) return res.status(404).json({ message: "user not exists" });

    const valid = await checkPassword(result.data.password, existsUser.hash)
    if (!valid) return res.status(401).json({ message: "wrong password" });
    const token = generateToken(existsUser._id, existsUser.role)
    res.json({ token })
}