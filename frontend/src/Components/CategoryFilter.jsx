import { useState, useEffect } from "react";

function CategoryFilter({ onFiltrar }) {
  const [categorias, setCategorias] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    fetch("https://budgetlog-production.up.railway.app/categorias/1")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch(() => console.error("No se pudieron cargar las categorías."));
  }, []);

  function handleClick(id) {
    const nueva = seleccionada === id ? null : id;
    setSeleccionada(nueva);
    onFiltrar(nueva);
  }

  return (
    <div style={{ maxWidth: "600px", margin: "1rem auto", fontFamily: "sans-serif" }}>
      <h3>Filtrar por categoría</h3>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        <button
          onClick={() => handleClick(null)}
          style={{
            padding: "6px 14px",
            borderRadius: "99px",
            border: "1px solid #d1d5db",
            background: seleccionada === null ? "#1f2937" : "white",
            color: seleccionada === null ? "white" : "#1f2937",
            cursor: "pointer",
          }}
        >
          Todos
        </button>
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            style={{
              padding: "6px 14px",
              borderRadius: "99px",
              border: `1px solid ${cat.color_hex}`,
              background: seleccionada === cat.id ? cat.color_hex : "white",
              color: seleccionada === cat.id ? "white" : cat.color_hex,
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;