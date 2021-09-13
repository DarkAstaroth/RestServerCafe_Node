const { response, request } = require("express");
const bcryptj = require("bcryptjs");

const Usuario = require("../models/usuario");
const { validationResult } = require("express-validator");

const usuarioGet = (req = request, res = response) => {};

const usuariosPost = async (req = request, res = response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya esta registrado",
    });
  }

  // Encriptar la contraseña
  const salt = bcryptj.genSaltSync();
  usuario.password = bcryptj.hashSync(password, salt);

  // Guardar en base de datos
  await usuario.save();

  res.json({
    usuario,
  });
};

module.exports = {
  usuarioGet,
  usuariosPost,
};
