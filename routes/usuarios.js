const { Router } = require("express");
const { check } = require("express-validator");
const { usuariosPost } = require("../controllers/usuarios");
const { esRoleValido } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/",
  [
    check("nombre", "El nombre el obligatorio").not().isEmpty(),
    check("password", "El password debe ser más de 6 letras").isLength({
      min: 6,
    }),
    check("rol").custom(esRoleValido),
    // check("rol", "No us un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("correo", "El correo no es valido").isEmail(),
    validarCampos,
  ],
  usuariosPost
);

module.exports = router;
