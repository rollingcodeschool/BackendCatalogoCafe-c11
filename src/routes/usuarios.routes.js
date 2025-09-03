import { Router } from "express";
import {
  leerUsuarios,
  crearUsuario,
} from "../controllers/usuarios.controllers.js";
const router = Router();
router.route("/").get(leerUsuarios).post(crearUsuario);
export default router;