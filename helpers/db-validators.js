const { Usuario, Categoria, Producto } = require("../models");
const Role = require("../models/rol");

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

// Verificar si exite el id de un usuario
const esUsuarioValido = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El usuario con id :  ${id} no existe`);
  }
};

// Verificar si existe una categoria
const esCategoriaValida = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`La categoria con id : ${id} no existe`);
  }
};

// Verificar si existe una categoria
const esProductoValido = async (id) => {
  const existeProducto = await Producto.findById(id);
  if (!existeProducto) {
    throw new Error(`La producto con id : ${id} no existe`);
  }
};

// validar las colecciones permitidas
const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      console.log(Error)
      `La coleccion ${coleccion} no es permitida - ${colecciones}`
    );
  }

  return true;
};

module.exports = {
  esRoleValido,
  esEmailValido,
  esUsuarioValido,
  esCategoriaValida,
  esProductoValido,
  coleccionesPermitidas,
};
