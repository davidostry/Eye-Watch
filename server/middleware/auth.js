import jwt from 'jsonwebtoken'

export function auth(req, res, next) {
    try {


        const { authorization } = req.headers
        if (!authorization || !authorization.startsWith("Bearer ")) return res.status(401).json({ message: "missing authorization" })
        const token = authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized"})
        

    }
}

export function authorization(req, res, next){
   
    const {role} = req.headers;

    if (!role) return res.status(400).json({message: "role is missing"});
    if (role !== "admin") return res.status(403).json({ message: "Forbidden"});
    next()
   
}