const inputUSD = document.getElementById("usd");
const botonConvertir = document.getElementById("convertir");
const resultadoTexto = document.getElementById("resultado");
const valorDolarTexto = document.getElementById("valor-dolar");

// Tasa de conversión
const TASA_CONVERSION = 1125;

valorDolarTexto.textContent = `Valor actual del dólar: $${TASA_CONVERSION.toLocaleString("es-AR")}`;

function convertirDolaresAPesos(usd) {
    if (isNaN(usd) || usd <= 0) {
        return "Por favor, ingresa una cantidad válida mayor a 0.";
    }
    const pesos = usd * TASA_CONVERSION;
    guardarEnStorage("ultimoResultado", pesos);
    return `USD ${usd} equivale a ARS $${pesos.toLocaleString("es-AR")}.`; // Formato correcto
}

function guardarEnStorage(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

// Función para manejar el clic del botón
botonConvertir.addEventListener("click", () => {
    const usd = parseFloat(inputUSD.value);
    const mensaje = convertirDolaresAPesos(usd); 
    resultadoTexto.textContent = mensaje;
});


document.addEventListener("DOMContentLoaded", () => {
    const ultimoResultado = JSON.parse(localStorage.getItem("ultimoResultado"));
    if (ultimoResultado) {
        resultadoTexto.textContent = `Última conversión guardada: ARS $${ultimoResultado.toLocaleString("es-AR")}.`;
    }
});
