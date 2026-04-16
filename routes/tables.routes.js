import { getTables, getTableData } from "../controllers/tables.controller.js";
import { Router } from "express";

const router = Router();

router.get('/tables', getTables);
router.get('/tables/:tableName', getTableData);

export default router;