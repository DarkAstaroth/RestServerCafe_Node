const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos");
const { esProductoValido } = require("../helpers/db-validators");
const { validarJWT, validarCampos } = require("../middlewares");

const router = Router();

// Obtener productos
router.get("/", [validarJWT], obtenerProductos);

// Obtener producto
router.get(
  "/:id",
  [
    validarJWT,
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esProductoValido),
    validarCampos,
  ],
  obtenerProducto
);

// Crear un producto nuevo
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "EL nombre es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("idCategoria", "La categoria es obligatorio").not().isEmpty(),
    check("idCategoria", "No tiene un id valido").isMongoId(),
    validarCampos,
  ],
  crearProducto
);

// Actualizar un producto
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "EL nombre es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("idCategoria", "La categoria es obligatorio").not().isEmpty(),
    check("idCategoria", "No tiene un id valido").isMongoId(),
    validarCampos,
  ],
  actualizarProducto
);

// EliminarProducto
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "El id es obligatorio").not().isEmpty(),
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(esProductoValido),
    validarCampos,
  ],
  eliminarProducto
);

module.exports = router;
