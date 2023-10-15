const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('./config.js');
const routes = require('./routes.js');


class App {

    constructor() {
        console.log('Aplicación creada');
        this.express = express();
        this.conectaDatabase();
        this.middlewares();
        this.routes();

        this.express.listen(2202,() => {
            console.log("Servidor corriendo en el puerto 2022");
        })
    }

    async conectaDatabase() {
        const data = await mongoose.connect(dbConfig.uri, { useNewUrlParser: true});
        console.log(data.connections);
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    routes() {
        this.express.use(routes);
    }
}

module.exports = new App();