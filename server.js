const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 2002; // Puerto configurado a 2002

app.use(bodyParser.json());

let productos = [
  { nombre: "Arroz", precio: 2.50 },
  { nombre: "Azúcar", precio: 1.80 }
];

let ventas = [
  { id: 1, precioTotal: 4.30, productosVendidos: [{ nombre: "Arroz", precio: 2.50 }, { nombre: "Azúcar", precio: 1.80 }] },
  { id: 2, precioTotal: 3.00, productosVendidos: [{ nombre: "Arroz", precio: 2.50 }, { nombre: "Arroz", precio: 0.50 }] }
];

// Ruta para registrar una venta
app.post('/registro-venta', (req, res) => {
  const { precioTotal, productosVendidos } = req.body;

  if (!precioTotal || !productosVendidos || productosVendidos.length === 0) {
    return res.status(400).send({ mensaje: 'Precio total y productos vendidos son requeridos' });
  }

  const id = ventas.length + 1; // Generar ID automáticamente
  const nuevaVenta = { id, precioTotal, productosVendidos };
  ventas.push(nuevaVenta);
  res.status(201).send(nuevaVenta);
});

// Ruta para obtener todas las ventas
app.get('/ventas', (req, res) => {
  res.send(ventas);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
