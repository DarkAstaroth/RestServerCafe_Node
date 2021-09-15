const Role = require("../models/rol");
const Usuario = require("../models/usuario");

// Verificar si existe el rol
const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

// Verificar si exite el correo
const esEmailValido = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

module.exports = {
  esRoleValido,
  esEmailValido,
};
