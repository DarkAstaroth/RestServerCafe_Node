const { Router } = require("express");
const { check } = require("express-validator");
const { usuariosPost } = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const Role = require("../models/rol");

const router = Router();

router.post(
  "/",
  [
    check("nombre", "El nombre el obligatorio").not().isEmpty(),
    check("password", "El password debe ser más de 6 letras").isLength({
      min: 6,
    }),
    check("rol").custom(async (rol = "") => {
      const existeRol = await Role.findOne({ rol });
      if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
      }
    }),
    // check("rol", "No us un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("correo", "El correo no es valido").isEmail(),
    validarCampos,
  ],
  usuariosPost
);

module.exports = router;
