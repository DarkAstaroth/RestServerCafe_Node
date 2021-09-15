const { response, request } = require("express");
const bcryptj = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuarioGet = (req = request, res = response) => {};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

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
