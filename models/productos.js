const mongoose = require('mongoose');

const ImagenesSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            require: true,
        },
        nombre: {
            type :String,
        }
    }
);

const ProductoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            require: [true, 'El producto debe tener un nombre']
        },
        sku: {
            type: String,
            require: [true, 'El producto debe tener su sku']
        },
        precio: {
            type: Number,
        },

        descripcion: {
            type: String,
        },
        dimensiones: {
            type: Map,
            of: Number,
        },
        proveedor: {
            type: String,
        },
        imagenes: [ImagenesSchema],
    }
)

module.exports = mongoose.model("Productos",ProductoSchema);