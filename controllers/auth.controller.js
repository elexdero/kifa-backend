import { tryConnection } from "../src/db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../src/config.js";

export const login = async (req, res) => {
    const { user, password } = req.body;

    try {
        const connection = await tryConnection(user, password);
        connection.end();

        const token = jwt.sign(
            {
                user: user, password: password
            },
            JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );
        return res.json({ message: "Login exitoso", token });
    } catch (error) {
        return res.status(401).json({ message: "Credenciales incorrectas", error: error.message });
    }
}