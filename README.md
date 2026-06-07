# 💰 BudgetLog

Aplicación Full Stack para gestión de gastos personales. Permite registrar gastos, categorizarlos y visualizar el estado del presupuesto mensual en tiempo real.

## 🚀 Stack tecnológico

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL

## 📐 Diseño previo

### Diagramas de flujo (PSeInt)
- Algoritmo de categorización automática por palabras clave
- Algoritmo de cierre de mes con acumuladores semanales
- Algoritmo de control de presupuesto con umbrales de alerta

### Modelo relacional

| Tabla | Descripción |
|---|---|
| `users` | Usuarios con presupuesto mensual |
| `categories` | Categorías por usuario |
| `expenses` | Gastos vinculados a usuario y categoría |

## ⚙️ Cómo correr el proyecto

### Backend
```bash
cd backend
npm install
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Variables de entorno
Creá un archivo `.env` en `/backend` con:

DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=budgetlog
DB_PORT=5432
PORT=3000


## ✨ Funcionalidades

- Barra de presupuesto con alertas en tres niveles (verde, amarillo, rojo)
- Registro de gastos con validación en frontend y backend
- Filtro por categoría en tiempo real
- Tabla de gastos mensual con totales

https://budget-6aad7n4cu-santiaago-barrionuevos-projects.vercel.app/
