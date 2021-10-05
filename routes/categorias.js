const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");
const { esCategoriaValida } = require("../helpers/db-validators");
const { validarJWT, esAdminRol } = require("../middlewares");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    // check('id').custom(existeCategoria)
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(esCategoriaValida),
    validarCampos,
  ],
  obtenerCategoria
);

// Crear una nueva categoria - privado - cualquier perseona con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar un registro por id
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(esCategoriaValida),
    check("nombre", "El nombre de la categoria es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarCategoria
);

// Delete una categoria - Admin
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRol,
    check("id", "el id no es valido").isMongoId(),
    check("id").custom(esCategoriaValida),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
