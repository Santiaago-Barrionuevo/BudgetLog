import { useState } from "react";

function ExpenseForm({ onGastoAgregado }) {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setExito(false);

    if (!form.amount || !form.description || !form.date) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (Number(form.amount) <= 0) {
      setError("El monto debe ser mayor a cero.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/gastos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, user_id: 1 }),
      });

      if (!res.ok) throw new Error("Error al guardar el gasto.");

      setExito(true);
      setForm({ amount: "", description: "", date: "" });
      onGastoAgregado();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Nuevo gasto</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {exito && <p style={{ color: "green" }}>Gasto registrado con éxito.</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Monto</label><br />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Descripción</label><br />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Fecha</label><br />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Registrar gasto
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;