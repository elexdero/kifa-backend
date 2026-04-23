import { Router } from "express";
import { getUsers, addUser, updateUsers } from "../controllers/examen.controller.js";
import { authMidd } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/Usuarios", authMidd, getUsers);
router.post("/Usuarios", authMidd, addUser);
/*router.delete("/Usuarios/:id", authMidd, deleteUser);
router.put("/Usuarios/:id", authMidd, updateUsers);
*/
export default router;