const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

// Obtener todas las categorias - publico
router.get('/');

// Obtener una categoria por id - publico
router.get('/:id');

// Crear una nueva categoria - privado - cualquier perseona con un token valido
router.post('/');

// Actualizar un registro por id
router.put('/:id');

// Delete una categoria - Admin
router.delete('/:id')

module.exports = router;