const { response, request } = require("express");
const bcryptj = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuarioGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const usuarios = await Usuario.find()
    .limit(Number(limite))
    .skip(Number(desde));
  res.json({
    usuarios,
  });
};

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

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  // Validar contra base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptj.genSaltSync();
    resto.password = bcryptj.hashSync(password, salt);
  }

  const usuario = await Usuario.findOneAndUpdate(id, resto);

  res.json(usuario);
};

module.exports = {
  usuarioGet,
  usuariosPost,
  usuariosPut,
};
