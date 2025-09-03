import productoRoutes from "./productos.routes.js";
import { Router } from "express";
import usuarioRoutes from "./usuarios.routes.js";
const router = Router();

router.use('/productos', productoRoutes)
router.use('/usuarios', usuarioRoutes)

export default router;
