import { Router } from "express";
import { loginAdmin, registrarAdmin } from "../controllers/auth.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.js";

const routes = Router()

routes.post('/registrar',registrarAdmin)
routes.post('/login',loginAdmin)

export default routes