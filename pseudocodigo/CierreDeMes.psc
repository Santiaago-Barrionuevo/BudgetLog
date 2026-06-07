Algoritmo CierreDeMesRobustecido
    Definir monto, totalFijos, totalVariables, totalOcio, totalGeneral Como Real
    Definir opcionCategoria, continuar Como Entero
    
    // 1. Inicialización de acumuladores y bandera de control
    totalFijos <- 0
    totalVariables <- 0
    totalOcio <- 0
    totalGeneral <- 0
    continuar <- 1
    
    Escribir "=== SISTEMA DE CIERRE DE MES ==="
    Escribir "--------------------------------"
    
    // 2. Bucle principal de carga de datos
    Mientras continuar = 1 Hacer
        
        // VALIDACIÓN 1: Asegurar que el monto sea un número positivo válido
        Repetir
            Escribir "Ingrese el monto del gasto (debe ser mayor a 0):"
            Leer monto
            Si monto <= 0 Entonces
                Escribir "Error: El monto no puede ser negativo ni cero."
                Escribir "--------------------------------"
            FinSi
        Hasta Que monto > 0
        
        // VALIDACIÓN 2: Asegurar que la categoría seleccionada sea una de las tres opciones
        Repetir
            Escribir "Seleccione la categoría del gasto:"
            Escribir "1. Gastos Fijos (Alquiler, servicios, etc.)"
            Escribir "2. Gastos Variables (Supermercado, transporte, etc.)"
            Escribir "3. Ocio / Entretenimiento"
            Leer opcionCategoria
            
            Si opcionCategoria < 1 O opcionCategoria > 3 Entonces
                Escribir "Error: Opción inválida. Por favor, elija entre 1 y 3."
                Escribir "--------------------------------"
            FinSi
        Hasta Que opcionCategoria >= 1 Y opcionCategoria <= 3
        
        // 3. Procesamiento y acumulación segura de datos
        Segun opcionCategoria Hacer
            1:
                totalFijos <- totalFijos + monto
            2:
                totalVariables <- totalVariables + monto
            3:
                totalOcio <- totalOcio + monto
        FinSegun
        
        // 4. Cálculo y muestra del subtotal en vivo (dentro del bucle)
        totalGeneral <- totalFijos + totalVariables + totalOcio
        
        Escribir "Gasto registrado con éxito."
        Escribir "Total acumulado hasta ahora: $", totalGeneral
        Escribir "--------------------------------"
        
        // VALIDACIÓN 3: Controlar la continuidad del bucle principal
        Repetir
            Escribir "¿Desea ingresar otro gasto? (1: Sí / 0: No)"
            Leer continuar
            Si continuar <> 1 Y continuar <> 0 Entonces
                Escribir "Error: Responda únicamente con 1 para Sí o 0 para No."
            FinSi
        Hasta Que continuar = 1 O continuar = 0
        
        Escribir "--------------------------------"
    FinMientras
    
    // 5. Salida de resultados (Resumen final al salir del bucle)
    Escribir ""
    Escribir "======================================="
    Escribir "        RESUMEN DE CIERRE DE MES       "
    Escribir "======================================="
    Escribir "Gastos Fijos:         $", totalFijos
    Escribir "Gastos Variables:     $", totalVariables
    Escribir "Ocio/Entretenimiento: $", totalOcio
    Escribir "---------------------------------------"
    Escribir "TOTAL GASTADO DEL MES: $", totalGeneral
    Escribir "======================================="
FinAlgoritmo