import pool from '../db.js';

async function obtenerReporteMensual(userId, fechaInicio, fechaFin) {
    try {
        const usuarioCheck = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
        
        if (usuarioCheck.rows.length === 0) {
            const error = new Error("Usuario inexistente");
            error.status = 404;
            throw error;
        }

        const query = `
            WITH presupuesto_usuario AS (
                SELECT id, monthly_budget FROM users WHERE id = $1
            ),
            gastos_semanales AS (
                SELECT 
                    DATE_TRUNC('week', date) AS inicio_semana,
                    SUM(amount) AS total_semana
                FROM expenses
                WHERE user_id = $1 AND date BETWEEN $2 AND $3
                GROUP BY DATE_TRUNC('week', date)
            ),
            acumulado_mes AS (
                SELECT COALESCE(SUM(amount), 0) AS total_mensual 
                FROM expenses
                WHERE user_id = $1 AND date BETWEEN $2 AND $3
            )
            SELECT 
                TO_CHAR(gs.inicio_semana, 'DD/MM/YYYY') AS semana_comienzo,
                gs.total_semana AS gastado_en_semana,
                u.monthly_budget AS presupuesto_total,
                am.total_mensual AS total_gastado_mes
            FROM presupuesto_usuario u
            CROSS JOIN gastos_semanales gs
            LEFT JOIN acumulado_mes am ON TRUE
            ORDER BY gs.inicio_semana ASC;
        `;

        const res = await pool.query(query, [userId, fechaInicio, fechaFin]);
        
        if (res.rows.length === 0) {
            const presupuestoRes = await pool.query('SELECT monthly_budget FROM users WHERE id = $1', [userId]);
            const presupuesto = parseFloat(presupuestoRes.rows[0].monthly_budget);
            
            return {
                presupuestoTotal: presupuesto,
                totalGastadoMes: 0,
                porcentajeGastado: 0,
                estadoAlerta: presupuesto > 0 ? "VERDE" : "SIN PRESUPUESTO",
                tendenciaSemanas: []
            };
        }

        const presupuestoTotal = parseFloat(res.rows[0].presupuesto_total);
        const totalGastadoMes = parseFloat(res.rows[0].total_gastado_mes);
        
        const tendenciaSemanas = res.rows.map(row => ({
            semana: row.semana_comienzo,
            gastado: parseFloat(row.gastado_en_semana)
        }));

        let porcentajeGastado = 0;
        let estadoAlerta = "SIN PRESUPUESTO";

        if (presupuestoTotal > 0) {
            porcentajeGastado = parseFloat(((totalGastadoMes / presupuestoTotal) * 100).toFixed(2));
            
            if (porcentajeGastado < 70) {
                estadoAlerta = "VERDE";
            } else if (porcentajeGastado <= 90) {
                estadoAlerta = "AMARILLO";
            } else {
                estadoAlerta = "ROJO";
            }
        }

        return {
            presupuestoTotal,
            totalGastadoMes,
            porcentajeGastado,
            estadoAlerta,
            tendenciaSemanas
        };

    } catch (err) {
        console.error("Error en el servicio de reportes:", err.message);
        throw err;
    }
}

export { obtenerReporteMensual };