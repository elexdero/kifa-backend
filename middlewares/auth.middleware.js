import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../src/config.js";
import { tryConnection } from "../src/db.js";

export const authMidd = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Acceso denegado: Credenciales invalidas." });
    }

    const token = authHeader.split(" ")[1];

    try {
        // 1. Validación del token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 2. Establecer la conexión usando las credenciales del token
        const connection = await tryConnection(decoded.user, decoded.password);

        // 3. Pasamos la conexión y el usuario a la request para que el controlador la pueda usar
        req.db = connection;
        req.userLogueado = decoded.user;

        // 4. next() le dice a Express que deje pasar la solicitud al controlador
        next();
    } catch (error) {
        // Cierre de sesión por tiempo expirado o token invalido
        error.status = 403;
        error.message = "Tu sesión ha expirado o el token es inválido.";
        return next(error);
    }
};
