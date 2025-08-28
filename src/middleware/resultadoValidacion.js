import { validationResult } from "express-validator";

const resultadoValidacion = (req, res, next) =>{
    const erorres = validationResult(req)
    //erorres.isEmpty() = true todo salio bien, no hay errores en la validacion
    //erorres.isEmpty() = false hay errores de validacion
    if(!erorres.isEmpty()){
        return res.status(400).json(erorres.array())
    }
    next()
}

export default resultadoValidacion;