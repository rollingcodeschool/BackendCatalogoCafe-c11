import { Router } from "express";
import { borrarProductoPorId, crearProducto, editarProductoPorId, leerProductoPorId, leerProductos, test } from "../controllers/productos.controllers.js";
import validacionProducto from "../middleware/validarProducto.js";

const router = Router();
// get, post, put, delete solicitud, request
router.route('/test').get(test)
router.route('/').get(leerProductos).post(validacionProducto,crearProducto)
router.route('/:id').get(leerProductoPorId).delete(borrarProductoPorId).put(validacionProducto,editarProductoPorId)

export default router;