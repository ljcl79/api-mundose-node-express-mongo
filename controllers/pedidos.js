const Pedido = require('../models/pedidos.js');

class PedidosController {
    async create(req, res) {
        try {
            const data = await Pedido.create(req.body);
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || 'Error al realizar la creación del pedido' }
            )
        }
    }

    async findAll(req, res) {
        try{
            const data = await Pedido.find();
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || 'Error al realizar la consulta de los pedidos' }
            )
        }
    }

    async findOne(req, res) {

        const id = req.params.id;

        try{
            const data = await Pedido.findById(id);
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || `Error al realizar la consulta del pedido con id: ${id}`}
            )
        }
    }

    async update(req, res) {
        const id = req.params.id;

        try {
            const data = await Pedido.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || `Error al realizar la actualización del pedido con id: ${id}` }
            )
        }
    }

    async delete(req, res) {
        const id = req.params.id;

        try {
            const data = await Pedido.findByIdAndDelete(id);
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || `Error al realizar el borrado del pedido con id: ${id}` }
            )
        }
    }
}

module.exports = new PedidosController();