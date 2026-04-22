import { tryConnection } from "../src/db.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../src/config.js";
import { authMidd } from "../middlewares/auth.middleware.js";

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
