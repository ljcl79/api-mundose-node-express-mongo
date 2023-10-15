const mongoose = require('mongoose');

const ProductosPedidoSchema = new mongoose.Schema(
    {
        sku: {
            type : String,
            required: [true,'Debe indicar el SKU o número de parte']
        },
        cantidad: {
            type : Number
        },
        precio: {
            type : Number
        },
        descuento: {
            type : Number
        },
        impuesto: {
            type: Number,
        },
        total: {
            type: Number,
        }
    }
);

const PedidoSchema = new mongoose.Schema (
    {
        fecha: {
            type: Date,
        },
        email: {
            type: String,
            require: [true,'Debe indicar un email válido'],
            lowercase: true,
            trim: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Debe indicar un email válido'],
        },
        nombre:{
            type: String,
            require: true,
        },
        status: {
            type: String,
            enum: ['Creado', 'Procesado','Enviado']
        },
        productos: [ProductosPedidoSchema],
        total: {
            type: Number,
        },
        descuento: {
            type: Number,
        },     

    }
);

module.exports = mongoose.model("Pedidos",PedidoSchema);