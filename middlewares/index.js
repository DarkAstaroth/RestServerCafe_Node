const  validarCampos  = require("../middlewares/validar-campos");
const  validarJWT  = require("../middlewares/valida-jwt");
const  validarRoles = require("../middlewares/validar-roles");

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
}