import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from './routes/productos.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/productos', productosRoutes);

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Conexión exitosa a MongoDB Atlas');
        app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
    })
    .catch(err => console.error('❌ Error de conexión:', err));