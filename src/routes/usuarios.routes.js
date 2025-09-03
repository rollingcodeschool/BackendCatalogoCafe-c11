import { Router } from "express";
import {
  leerUsuarios,
  crearUsuario,
} from "../controllers/usuarios.controllers.js";
import validacionUsuario from "../middleware/validarUsuario.js";

const router = Router();
router.route("/").get(leerUsuarios).post(validacionUsuario, crearUsuario);
export default router;