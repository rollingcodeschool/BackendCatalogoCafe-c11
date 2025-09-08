import generarJWT from "../helpers/generarJWT.js";
import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";

export const leerUsuarios = async (req, res) => {
  try {
    const listaUsuarios = await Usuario.find();
    res.status(200).json(listaUsuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al leer los usuarios" });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombreUsuario, email, password } = req.body;
    //hashear el password
    const saltos = bcrypt.genSaltSync(10);
    console.log(saltos);
    const passwordHash = bcrypt.hashSync(password, saltos);
    console.log(passwordHash);
    const nuevoUsuario = new Usuario({
      nombreUsuario,
      email,
      password: passwordHash,
    });
    await nuevoUsuario.save();
    //4- enviar respuesta
    res.status(201).json({
      mensaje: `El usuario: ${nuevoUsuario.nombreUsuario} fue registrado exitosamente`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear el usuario" });
  }
};

export const login = async (req, res) => {
  try {
    //1- verificar si el email existe, si no existe enviar mensaje de error
    const { email, password } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (!usuarioExistente) {
      return res.status(404).json({ mensaje: "No se encontro el usuario" });
    }
    //2- si existe el email, verificar el password. Si el password no es el mismo entonces enviar mensaje de error
    const passwordVerificado = bcrypt.compareSync(
      password,
      usuarioExistente.password
    );
    if (!passwordVerificado) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas" });
    }
    //3- generar el token
    const token = await generarJWT(
      usuarioExistente.nombreUsuario,
      usuarioExistente.email
    );
    //4- enviar la respuesta al frontend
    res
      .status(200)
      .json({
        mensaje: "Login exitoso",
        nombreUsuario: usuarioExistente.nombreUsuario,
        token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al loguear el usuario" });
  }
};
