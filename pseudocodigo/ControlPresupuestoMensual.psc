Algoritmo ControlPresupuestoMensual
    Definir presupuesto, gastoSemana, totalGastado, porcentaje Como Real
    Definir gastosSemanales Como Real
    Dimension gastosSemanales[4] // Vector para guardar las 4 semanas
    Definir i Como Entero
    Definir alerta Como Cadena
    
    Escribir "=== CONFIGURACIÓN DEL MES ==="
    // Validación: Presupuesto debe ser positivo
    Repetir
        Escribir "Ingrese su presupuesto mensual estimado (mayor a 0):"
        Leer presupuesto
        Si presupuesto <= 0 Entonces
            Escribir "Error: El presupuesto debe ser un monto válido."
        FinSi
    Hasta Que presupuesto > 0
    
    Escribir ""
    Escribir "=== CARGA DE GASTOS POR SEMANA ==="
    totalGastado <- 0
    
    // Bucle para recolectar la tendencia semanal
    Para i <- 1 Hasta 4 Hacer
        Repetir
            Escribir "Ingrese el total de gastos de la Semana ", i, ":"
            Leer gastoSemana
            Si gastoSemana < 0 Entonces
                Escribir "Error: El gasto no puede ser negativo."
            FinSi
        Hasta Que gastoSemana >= 0
        
        gastosSemanales[i] <- gastoSemana
        totalGastado <- totalGastado + gastoSemana // Acumulador mensual
    FinPara
    
    // MATEMÁTICA: Cálculo del porcentaje gastado
    porcentaje <- (totalGastado / presupuesto) * 100
    
    // LÓGICA DE UMBRALES: Determinación de alertas
    Si porcentaje < 70 Entonces
        alerta <- "VERDE - Gasto bajo control (<70%)"
    Sino
        Si porcentaje <= 90 Entonces
            alerta <- "AMARILLO - Atención, límite alcanzado (70% - 90%)"
        Sino
            alerta <- "ROJO - Alerta de exceso de gasto (>90%)"
        FinSi
    FinSi
    
    // REPORTE DE RESULTADOS Y TENDENCIA
    Escribir ""
    Escribir "======================================="
    Escribir "        REPORTE DE TENDENCIA           "
    Escribir "======================================="
    Para i <- 1 Hasta 4 Hacer
        Escribir "Semana ", i, ": $", gastosSemanales[i]
    FinPara
    Escribir "---------------------------------------"
    Escribir "Presupuesto Total: $", presupuesto
    Escribir "Total Gastado:     $", totalGastado
    Escribir "Porcentaje Usado:  ", REDONDEO(porcentaje), "%"
    Escribir "ESTADO DE ALERTA:  ", alerta
    Escribir "======================================="
FinAlgoritmo