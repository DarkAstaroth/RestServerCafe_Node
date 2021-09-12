const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middleware();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware() {
        //CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static("public"));
    }

    routes() {

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en puerto ", this.port);
        })
    }
}

module.exports = Server;