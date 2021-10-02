const { response, request } = require("express");
const { Categoria } = require("../models");
const { populate } = require("../models/categoria");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.count(query),
    Categoria.find(query)
      .limit(Number(limite))
      .skip(Number(desde))
      .populate("usuario", "nombre"),
  ]);

  res.json({
    total,
    categorias,
  });
};

// ObtenerCategoria - populate {}
const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  res.json({
    categoria,
  });
};

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);
  await categoria.save();

  res.status(200).json(categoria);
};

// Actualizar Categoria
const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const nombre = req.body.nombre.toUpperCase();

  const data = {
    nombre,
  };
  const categoria = await Categoria.findOneAndUpdate(id, data);
  res.json(categoria);
};

// Borrar Categoria - estado:false
const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;

  const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });
  res.json(categoria);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
};
