import jwt from "jsonwebtoken";
import { TOKEN_ADMIN } from "../config.js";


export const authenticateAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_ADMIN);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};