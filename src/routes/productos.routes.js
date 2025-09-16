import { Router } from "express";
import { borrarProductoPorId, crearProducto, editarProductoPorId, leerProductoPorId, leerProductos, productosPaginados, test } from "../controllers/productos.controllers.js";
import validacionProducto from "../middleware/validarProducto.js";
import verificarJWT from "../middleware/verificarJWT.js";

const router = Router();
// get, post, put, delete solicitud, request
router.route('/test').get(test)
router.route('/').get(leerProductos).post([verificarJWT,validacionProducto],crearProducto)
router.route('/paginacion').get(productosPaginados)
router.route('/:id').get(leerProductoPorId).delete(verificarJWT,borrarProductoPorId).put([verificarJWT,validacionProducto],editarProductoPorId)

export default router;