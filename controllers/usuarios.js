const { response, request } = require('express');
const Usuario = require('../models/usuario');

const usuarioGet = (req = request, res = response) => {

}

const usuariosPost = async (req = request, res = response) => {

    const body = req.body;
    const usuario = new Usuario(body);
    
    await usuario.save();

    res.json({
        msg:"post API - desde controller",
        usuario
    })
}

module.exports = {
    usuarioGet,
    usuariosPost
}