import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool from './src/db.js';
import { obtenerReporteMensual } from './src/services/reportes.service.js'; 

const app = express();

app.use(cors());
app.use(express.json());

app.get('/reporte/:userId', async (req, res) => {
    const { userId } = req.params;
    const { inicio, fin } = req.query; 

    if (!inicio || !fin) {
        return res.status(400).json({ 
            error: "Faltan parámetros obligatorios: 'inicio' y 'fin' (Formato requerido: YYYY-MM-DD)." 
        });
    }

    try {
        const reporte = await obtenerReporteMensual(userId, inicio, fin);
        return res.status(200).json(reporte);
        
    } catch (error) {
        if (error.status === 404) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: "Error interno del servidor al procesar las métricas." });
    }
});

app.post('/gastos', async (req, res) => {
    const { amount, description, date, user_id } = req.body;

    if (!amount || !description || !date || !user_id) {
        return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    try {
        await pool.query(
            'INSERT INTO expenses (amount, description, date, user_id) VALUES ($1, $2, $3, $4)',
            [amount, description, date, user_id]
        );
        return res.status(201).json({ mensaje: "Gasto registrado correctamente." });
    } catch (err) {
        console.error("Error al insertar gasto:", err.message);
        return res.status(500).json({ error: "Error interno al registrar el gasto." });
    }
});

app.get('/gastos/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const { inicio, fin } = req.query;

    if (isNaN(userId)) {
        return res.status(400).json({ error: "El userId debe ser un número válido." });
    }

    if (!inicio || !fin) {
        return res.status(400).json({ error: "Faltan parámetros 'inicio' y 'fin'." });
    }

    try {
        const result = await pool.query(
            `SELECT e.id, e.amount, e.description, e.date, e.category_id,
                    COALESCE(c.name, 'Sin categoría') AS categoria
             FROM expenses e
             LEFT JOIN categories c ON e.category_id = c.id
             WHERE e.user_id = $1 AND e.date BETWEEN $2 AND $3
             ORDER BY e.date DESC`,
            [userId, inicio, fin]
        );
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error al obtener gastos:", err.message);
        return res.status(500).json({ error: "Error interno al obtener los gastos." });
    }
});

app.get('/categorias/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
        return res.status(400).json({ error: "El userId debe ser un número válido." });
    }

    try {
        const result = await pool.query(
            'SELECT id, name, color_hex FROM categories WHERE user_id = $1 ORDER BY name ASC',
            [userId]
        );
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error al obtener categorías:", err.message);
        return res.status(500).json({ error: "Error interno al obtener las categorías." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en: http://localhost:${PORT}`);
});