document.addEventListener("DOMContentLoaded", () => {
    obtenerCotizacion();
    actualizarHistorial();
});

let cotizacionActual = {};

function obtenerCotizacion() {
    fetch("https://api.bluelytics.com.ar/v2/latest")
        .then(response => response.json())
        .then(data => {
            cotizacionActual = {
                oficial: data.oficial.value_avg,
                blue: data.blue.value_avg
            };

            document.getElementById("dolar-oficial").textContent = `$${cotizacionActual.oficial}`;
            document.getElementById("dolar-blue").textContent = `$${cotizacionActual.blue}`;
        })
        .catch(error => {
            console.error("Error obteniendo la cotización:", error);
            Swal.fire("Error", "No se pudo obtener la cotización del dólar.", "error");
        });
}

let historial = JSON.parse(localStorage.getItem("historial")) || [];

document.getElementById("convertir").addEventListener("click", convertirDolares);

function convertirDolares() {
    const monto = parseFloat(document.getElementById("monto").value);
    const tipoDolar = document.getElementById("tipo-dolar").value;

    if (isNaN(monto) || monto <= 0) {
        Swal.fire("Error", "Por favor, ingresá un monto válido.", "warning");
        return;
    }

    let cotizacion = cotizacionActual[tipoDolar];
    if (!cotizacion) {
        Swal.fire("Error", "No se pudo obtener la cotización actual.", "error");
        return;
    }

    let resultado = monto * cotizacion;
    document.getElementById("resultado").textContent = resultado.toFixed(2);

    let conversion = {
        montoDolares: monto,
        tipo: tipoDolar === "oficial" ? "Oficial" : "Blue",
        cotizacion: cotizacion,
        resultado: resultado.toFixed(2)
    };

    historial.push(conversion);
    localStorage.setItem("historial", JSON.stringify(historial));
    actualizarHistorial();
}

function actualizarHistorial() {
    const historialElemento = document.getElementById("historial");
    historialElemento.innerHTML = "";

    historial.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${index + 1}. ${item.montoDolares} USD (${item.tipo}) → ${item.resultado} ARS @ $${item.cotizacion}`;
        historialElemento.appendChild(li);
    });
}

document.getElementById("borrar-historial").addEventListener("click", () => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminará todo el historial de conversiones.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            historial = [];
            localStorage.removeItem("historial");
            actualizarHistorial();
            Swal.fire("Eliminado", "El historial fue eliminado con éxito.", "success");
        }
    });
});



