import jwt from "jsonwebtoken";
import { TOKEN_REPARTIDOR } from "../config.js";


export const authenticateRepartidor = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_REPARTIDOR);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};