const { response, request } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
    res.status(400).json("No hay archivos que subir");
    return;
  }

  try {
    const nombre = await subirArchivo(req.files,undefined,'img');
    res.json({
      nombre,
    });
  } catch (error) {
      res.status(400).json({
          error
      });
  }
};

module.exports = {
  cargarArchivo,
};
