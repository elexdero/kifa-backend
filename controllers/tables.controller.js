import { tryConnection } from "../src/db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../src/config.js";
import { authMidd } from "../middlewares/auth.middleware.js";

export const getTables = async (req, res, next) => {
    try {
        req.db.query('SHOW TABLES', (err, results) => {
            if (err) {
                req.db.end();
                err.status = 500;
                return next(err);
            }
            req.db.end();
            const tableNames = results.map(row => Object.values(row)[0]);

            // Filtrar para que solo devuelva la tabla "trabajadores" si tiene permiso
            const allowedTables = tableNames.includes('empleados') ? ['empleados'] : [];

            //se envia al front
            return res.json({
                message: "Renderiza la tabla de clientes",
                tables: allowedTables,
                userLogueado: req.userLogueado
            });
        });

    } catch (error) {
        return next(error);
    }
}

export const getTableData = async (req, res, next) => {
    const { tableName } = req.params;

    try {
        // req.db viene de tu nuevo middleware (authMidd)
        req.db.query(`SELECT * FROM ??`, [tableName], (err, results, fields) => {
            req.db.end();

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
        return next(error);
    }
}

export const updateTables = async (req, res, next) => {
    try {

    } catch (error) {
        return next(error)
    }
}
