const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    // leer el uuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
        return res.status(401).json({
            msg:"Token no válido - usuario no exite en la BD"
        })
    }

    // verificar si el uid tiene estado en true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token nó valido - usuario con estado: false",
      });
    }
    req.usuario = usuario;
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no validovalido",
    });
  }
};

module.exports = {
  validarJWT,
};
