const mongoose = require('mongoose');
const dbConfig = require('./config.js');
const dataProductos = require('./ejemploProductos.js');
const Producto = require('./models/productos.js');
const fs = require('fs');

main = async () => {
    const data = await mongoose.connect(dbConfig.uri, { useNewUrlParser: true});
    if (data) {
        await Producto.deleteMany({});

        const jsonProductos = [];

        dataProductos.map(async (p) => {
            const productoData = {
                nombre: p['Product Name'],
                sku: p['Uniq Id'].substring(0,10).toUpperCase(),
                precio: parseFloat(p['Selling Price'].replaceAll('$','')) ?? 0,
                descripcion: p['Technical Details'],
                imagenes:  p['Image'].split('|').map((i) => {
                    return {
                        'url':i,
                        'nombre':i
                    };
                }),
            }
            jsonProductos.push(productoData);
            await Producto.create(productoData);
        });

        fs.writeFileSync('data.json',JSON.stringify(jsonProductos));
        console.log("Finalizado");
        process.exit();
    }
}

main();