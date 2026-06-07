Algoritmo CategorizacionAutomatica
    Definir descripcion, descripcionMinus, categoria Como Cadena
    
    // 1. Entrada de datos (una sola lectura limpia)
    Escribir "Ingrese la descripción del producto o gasto (ej: celular, leche, remera):"
    Leer descripcion
    
    // 2. Preprocesamiento (pasamos a minúsculas)
    descripcionMinus <- Minusculas(descripcion)
    
    // 3. Validación de caso borde (longitud mínima)
    Si Longitud(descripcionMinus) < 3 Entonces
        Escribir "Error: La descripción es muy corta o está vacía. Intente de nuevo."
    Sino
        // 4. Lógica de categorización por coincidencia exacta
        Si descripcionMinus = "celular" O descripcionMinus = "computadora" O descripcionMinus = "teclado" Entonces
            categoria <- "Tecnologia"
        Sino
            Si descripcionMinus = "manzana" O descripcionMinus = "arroz" O descripcionMinus = "leche" Entonces
                categoria <- "Alimentos"
            Sino
                Si descripcionMinus = "remera" O descripcionMinus = "jean" O descripcionMinus = "campera" Entonces
                    categoria <- "Ropa"
                Sino
                    categoria <- "No se pudo categorizar. Por favor revisá la descripción"
                FinSi
            FinSi
        FinSi
        
        // 5. Salida de datos (solo ocurre si la validación fue exitosa)
        Escribir "Categoria asignada: ", categoria
    FinSi
FinAlgoritmo

// NOTA: En la implementación real en JavaScript se usará includes()
// para detectar si la descripción CONTIENE la palabra clave,
// no si es exactamente igual a ella.