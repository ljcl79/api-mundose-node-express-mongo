const express = require('express');
const routes = express.Router();
const { verifyJWT } = require('./helpers/util.js');
const clientes = require('./controllers/clientes.js');
const productos = require('./controllers/productos.js');
const pedidos = require('./controllers/pedidos.js');

//Rutas de productos
routes.post('/producto', verifyJWT, productos.create);

routes.get('/productos', productos.findAll);

routes.get('/producto/:id', productos.findOne);

routes.put('/producto/:id', verifyJWT, productos.update);

routes.delete('/producto/:id', verifyJWT, productos.delete);

//Rutas de clientes

routes.post('/cliente/auth', clientes.auth);

routes.post('/cliente', clientes.create);

routes.get('/clientes', verifyJWT, clientes.findAll);

routes.get('/cliente/:id', verifyJWT, clientes.findOne);

routes.put('/cliente/:id', verifyJWT, clientes.update);

routes.delete('/cliente/:id', verifyJWT, clientes.delete);

//Rutas de pedidos

routes.post('/pedido', verifyJWT, pedidos.create);

routes.get('/pedidos', verifyJWT, pedidos.findAll);

routes.get('/pedido/:id', verifyJWT, pedidos.findOne);

routes.put('/pedido/:id', verifyJWT, pedidos.update);

routes.delete('/pedido/:id', verifyJWT, pedidos.delete);

module.exports = routes;