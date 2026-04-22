import { getTableData } from "../controllers/tables.controller.js";
import { Router } from "express";
import { authMidd } from "../middlewares/auth.middleware.js";

const router = Router();

// Pasamos authMidd ANTES del controlador
router.get('/tables/:tableName', authMidd, getTableData);

export default router;