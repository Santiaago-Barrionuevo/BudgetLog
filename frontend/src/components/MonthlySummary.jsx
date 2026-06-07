import { useState, useEffect } from "react";

function MonthlySummary({ refresh, categoriaFiltro }) {
  const [gastos, setGastos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/gastos/1?inicio=2026-06-01&fin=2026-06-30")
      .then((res) => res.json())
      .then((data) => setGastos(data))
      .catch(() => setError("No se pudieron cargar los gastos."));
  }, [refresh]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const gastosFiltrados = categoriaFiltro
    ? gastos.filter((g) => g.category_id === categoriaFiltro)
    : gastos;

  if (gastosFiltrados.length === 0) return <p style={{ maxWidth: "600px", margin: "1rem auto", fontFamily: "sans-serif" }}>No hay gastos para esta categoría.</p>;

  const total = gastosFiltrados.reduce((acc, g) => acc + parseFloat(g.amount), 0);

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Gastos del mes</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={th}>Fecha</th>
            <th style={th}>Descripción</th>
            <th style={th}>Categoría</th>
            <th style={th}>Monto</th>
          </tr>
        </thead>
        <tbody>
          {gastosFiltrados.map((g) => (
            <tr key={g.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={td}>{g.date?.slice(0, 10)}</td>
              <td style={td}>{g.description}</td>
              <td style={td}>{g.categoria}</td>
              <td style={td}>${parseFloat(g.amount).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ fontWeight: "bold", background: "#f9fafb" }}>
            <td style={td} colSpan={3}>Total</td>
            <td style={td}>${total.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

const th = { padding: "10px", textAlign: "left", fontWeight: "600" };
const td = { padding: "10px", textAlign: "left" };

export default MonthlySummary;