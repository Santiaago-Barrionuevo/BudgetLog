import { useState, useEffect, useCallback } from "react";
import BudgetGauge from "./components/BudgetGauge";
import ExpenseForm from "./components/ExpenseForm";
import MonthlySummary from "./components/MonthlySummary";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  const [reporte, setReporte] = useState(null);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [categoriaFiltro, setCategoriaFiltro] = useState(null);

  const fetchReporte = useCallback(() => {
    fetch("https://budgetlog-production.up.railway.app/reporte/1?inicio=2026-06-01&fin=2026-06-30")
      .then((res) => res.json())
      .then((data) => setReporte(data))
      .catch(() => setError("No se pudo conectar con el servidor."));
    setRefresh((r) => r + 1);
  }, []);

  useEffect(() => {
    fetchReporte();
  }, [fetchReporte]);

  if (error) return <p>{error}</p>;
  if (!reporte) return <p>Cargando...</p>;

  return (
    <div>
      <h1>BudgetLog</h1>
      <BudgetGauge
        porcentaje={reporte.porcentajeGastado}
        estado={reporte.estadoAlerta}
        total={reporte.totalGastadoMes}
        presupuesto={reporte.presupuestoTotal}
      />
      <ExpenseForm onGastoAgregado={fetchReporte} />
      <CategoryFilter onFiltrar={setCategoriaFiltro} />
      <MonthlySummary refresh={refresh} categoriaFiltro={categoriaFiltro} />
    </div>
  );
}

export default App;