const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosPost } = require('../controllers/usuarios')

const router = Router();

router.post("/",[
    check('correo','El correo no es valido').isEmail(),
], usuariosPost);

module.exports = router;