
import { getUserByEmail, createUser, getUserById, deleteUser, getAllUsers } from "../DAL/users.js";
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
    try {

        const result = userSchma.safeParse(req.body);
        if (!result.success) return res.status(400).json({ message: "missing details" });
        const existsUser = await getUserByEmail(result.data.email);
        if (!existsUser) return res.status(404).json({ message: "user not exists" });

        const valid = await checkPassword(result.data.password, existsUser.hash)
        if (!valid) return res.status(401).json({ message: "wrong password" });
        const token = generateToken(existsUser._id, existsUser.role)
        res.json({ token })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "server error" })

    }

}

export async function getUserDetails(req, res) {
    try {
        const { email } = req.body
        const user = await getUserByEmail(email)
        if (!user) return res.status(404).json({ message: "user not found" })

        delete (user.hash)
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed to get details" })

    }
}

export async function removeUser(req, res) {
    try {
        const { id } = req.params
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ message: "user not found" });
        await deleteUser(id);
        res.sendStatus(204);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed to get details" })

    }

}

export async function showAllUsers(req, res) {
    try {

        const allUsers = await getAllUsers();
        allUsers.map(u=>{
            u.hash = "encoded"
        })
        res.json(allUsers)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed to get users" })

    }

}