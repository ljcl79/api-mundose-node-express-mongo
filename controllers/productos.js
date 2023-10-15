const Producto = require('../models/productos.js');

class ProductosController {
    async create(req, res) {
        try {
            const data = await Producto.create(req.body);
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || 'Error al realizar la creación del producto' }
            )
        }
    }

    async findAll(req, res) {
        try{
            const data = await Producto.find();
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || 'Error al realizar la consulta de los productos' }
            )
        }
    }

    async findOne(req, res) {

        const id = req.params.id;

        try{
            const data = await Producto.findById(id);
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || `Error al realizar la consulta del producto con id: ${id}`}
            )
        }
    }

    async update(req, res) {
        const id = req.params.id;

        try {
            const data = await Producto.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || `Error al realizar la actualización del producto con id: ${id}` }
            )
        }
    }

    async delete(req, res) {
        const id = req.params.id;

        try {
            const data = await Producto.findByIdAndDelete(id);
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || `Error al realizar el borrado del producto con id: ${id}` }
            )
        }
    }
}

module.exports = new ProductosController();