const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosPost,
  usuariosPut,
  usuarioGet,
  usuariosDelete,
} = require("../controllers/usuarios");
const {
  esRoleValido,
  esEmailValido,
  esUsuarioValido,
} = require("../helpers/db-validators");

const {
  validarCampos,
  validarJWT,
  esAdminRol,
  tieneRol,
} = require("../middlewares");

const router = Router();

router.get("/", usuarioGet);

router.put(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esUsuarioValido),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

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
    check("correo").custom(esEmailValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRol, a fuerza debe ser un administrador para realizar la accion
    tieneRol("ADMIN_ROLE", "VENTAS_ROLE"), // debe ser uno de los roles enviados para realizar la tarea
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esUsuarioValido),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
