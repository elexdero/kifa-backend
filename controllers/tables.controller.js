import { tryConnection } from "../src/db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../src/config.js";

export const getTables = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Acceso denegado: Credenciales invalidas." });
    }

    const token = authHeader.split(" ")[1];

    try {
        //validación del token
        const decoded = jwt.verify(token, JWT_SECRET);
        const connection = await tryConnection(decoded.user, decoded.password);

        connection.query('SHOW TABLES', (err, results) => {
            connection.end();

            if (err) {
                err.status = 500;
                return next(err);
            }
            //limpiar datos de la db para enviar al front
            const tableNames = results.map(row => Object.values(row)[0]);

            //se envia al front
            return res.json({
                message: "Aceptado enteramente por la VPS",
                tables: tableNames,
                userLogueado: decoded.user
            });
        });

    } catch (error) {
        //cierre de sesión por tiempo expirado o token invalido
        error.status = 403;
        error.message = "Tu sesión ha expirado o el token es inválido.";
        return next(error);
    }
}

export const getTableData = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const { tableName } = req.params;

    if (!authHeader) {
        return res.status(401).json({ message: "Acceso denegado: Credenciales invalidas." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const connection = await tryConnection(decoded.user, decoded.password);

        // Fetch columns and rows
        connection.query(`SELECT * FROM ??`, [tableName], (err, results, fields) => {
            connection.end();

            if (err) {
                err.status = 500;
                return next(err);
            }

            const columns = fields.map(field => field.name);
            
            return res.json({
                message: "Datos obtenidos con exito",
                columns: columns,
                rows: results
            });
        });

    } catch (error) {
        error.status = 403;
        error.message = "Tu sesión ha expirado o el token es inválido.";
        return next(error);
    }
}
