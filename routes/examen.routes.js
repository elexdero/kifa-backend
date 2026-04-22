import { Router } from "express";
import { getUsers, addUser, updateUsers } from "../controllers/examen.controller.js";
import { authMidd } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/api/Usuarios", authMidd, getUsers);
router.post("/api/Usuarios", authMidd, addUser);
/*router.delete("/api/Usuarios/:id", authMidd, deleteUser);
router.put("/api/Usuarios/:id", authMidd, updateUsers);
*/
export default router;