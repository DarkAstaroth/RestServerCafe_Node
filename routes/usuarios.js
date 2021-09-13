const { Router } = require('express');
const { usuariosPost } = require('../controllers/usuarios')

const router = Router();

router.post("/", usuariosPost);

module.exports = router;