function BudgetGauge({ porcentaje, estado, total, presupuesto }) {
  const colores = {
    VERDE: "#22c55e",
    AMARILLO: "#eab308",
    ROJO: "#ef4444",
    "SIN PRESUPUESTO": "#6b7280",
  };

  const color = colores[estado] || "#6b7280";

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Resumen del mes</h2>

      <div style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
        <span>Gastado: ${total}</span>
        <span>Presupuesto: ${presupuesto}</span>
      </div>

      <div style={{ background: "#e5e7eb", borderRadius: "8px", height: "24px", overflow: "hidden" }}>
        <div
          style={{
            width: `${Math.min(porcentaje, 100)}%`,
            background: color,
            height: "100%",
            borderRadius: "8px",
            transition: "width 0.5s ease",
          }}
        />
      </div>

      <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between" }}>
        <span style={{ color, fontWeight: "bold" }}>● {estado}</span>
        <span>{porcentaje}%</span>
      </div>
    </div>
  );
}

export default BudgetGauge;