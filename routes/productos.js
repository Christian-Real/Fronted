import express from 'express';
import Producto from '../models/productos.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { nombre, categoria, precio, stock } = req.body;
    const nuevoProducto = new Producto({ nombre, categoria, precio, stock });

    try {
        const guardado = await nuevoProducto.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

export default router;