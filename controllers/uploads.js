const { response, request } = require("express");

const cargarArchivo = (req = request, res = response) => {
  res.json({
    msg: "Hola desde uploads",
  });
};

module.exports = {
  cargarArchivo,
};
