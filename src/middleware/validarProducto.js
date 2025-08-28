import { body } from "express-validator";
import resultadoValidacion from "./resultadoValidacion.js";

const validacionProducto = [
  body("nombreProducto")
    .notEmpty()
    .withMessage("El nombre del producto es obligatorio")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre del producto debe tener entre 2 y 100 caracteres"),
  body("precio")
    .notEmpty()
    .withMessage("El precio es un dato obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .custom((valor) => {
      if (valor >= 50 && valor <= 1000000) {
        return true;
      } else {
        throw new Error("El precio debe estar entre 50 y 1000000");
      }
    }),
  body("imagen")
    .notEmpty()
    .withMessage("La imagen es un dato obligatorio")
    .matches(
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?(\.(jpg|jpeg|png|webp))$/
    )
    .withMessage(
      "La imagen debe ser una URL válida y debe terminar en .jpg, .jpeg, .png o .webp"
    ),
  (req, res, next) => resultadoValidacion(req, res, next),
];

export default validacionProducto;
