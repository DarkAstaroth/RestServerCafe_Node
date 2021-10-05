const { response, request } = require("express");
const { Producto, Categoria } = require("../models");

const obtenerProductos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.count(query),
    Producto.find(query)
      .limit(Number(limite))
      .skip(Number(desde))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
  ]);

  res.json({
    total,
    productos,
  });
};

const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");
  res.json({
    producto,
  });
};

const crearProducto = async (req = request, res = response) => {
  const { nombre, precio, idCategoria } = req.body;

  const productoName = await Producto.findOne({ nombre });
  if (productoName) {
    return res.status(400).json({
      msg: `El producto con el nombre ${nombre} ya existe`,
    });
  }
  const categoria = await Categoria.findById(idCategoria);
  if (!categoria) {
    return res.status(401).json({
      msg: "La categoria no existe",
    });
  }

  // Generar la data para guardar
  const data = {
    nombre:nombre.toUpperCase(),
    precio,
    categoria: idCategoria,
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);
  await producto.save();

  res.status(200).json(producto);
};

const actualizarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const { nombre, precio, idCategoria } = req.body;

  const categoria = await Categoria.findById(idCategoria);
  if (!categoria) {
    return res.status(401).json({
      msg: "La categoria no existe",
    });
  }

  const data = {
    nombre,
    precio,
    categoria: idCategoria,
  };

  const producto = await Producto.findByIdAndUpdate(id, data);
  res.status(200).json(producto);
};

const eliminarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findByIdAndUpdate(id, { estado: false });
  res.json(producto);
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
};
