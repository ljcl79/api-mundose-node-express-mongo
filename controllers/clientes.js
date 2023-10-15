const jwt = require('jsonwebtoken');
const { comparePassword } = require('../helpers/util.js');
const Cliente = require('../models/clientes.js');

class ClientesController {
    async create(req, res) {
        try {
            const data = await Cliente.create(req.body);
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || 'Error al realizar la creación del cliente' }
            )
        }
    }

    async findAll(req, res) {
        try{
            const data = await Cliente.find();
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || 'Error al realizar la consulta de los clientes' }
            )
        }
    }

    async findOne(req, res) {

        const id = req.params.id;

        try{
            const data = await Cliente.findById(id);
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || `Error al realizar la consulta del cliente con id: ${id}`}
            )
        }
    }

    async update(req, res) {
        const id = req.params.id;

        try {
            const data = await Cliente.findByIdAndUpdate(id, req.body, { useFindAndModify: false });
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || `Error al realizar la actualización del cliente con id: ${id}` }
            )
        }
    }

    async delete(req, res) {
        const id = req.params.id;

        try {
            const data = await Cliente.findByIdAndDelete(id);
            return res.status(201).json(data);
        } catch(err) {
            res.status(500).send(
                { message: err.message || `Error al realizar el borrado del cliente con id: ${id}` }
            )
        }
    }

    async auth(req, res) {
        try {
            const { email, clave } = req.body;
            const data = await Cliente.find({ email });

            if (data.length == 0) {
                res.status(500).send('Email no encontrado');

            } else {
                comparePassword(clave, data[0].clave, function(err, isMatch) {
                    if (err) {
                        res.status(500).send(err);
                    };
                    if (isMatch) {
                        const token = jwt.sign({email}, "FraseSecretaPara", {
                            expiresIn: 300,
                        });
                        return res.json({auth: true, token: token});
                    } else {
                        res.status(500).send('Clave no válida');
                    };

                });
            }
        } catch (err) {
            res.status(500).send(
                { message: err.message || `Error al realizar la autenticación del cliente` }
            )
        }
    }
}

module.exports = new ClientesController();