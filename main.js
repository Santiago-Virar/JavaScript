// Simulador interactivo: 
alert("Bienvenido al simulador de compras de fundas y accesorios.");

let continuar = true; // Controla si el usuario quiere seguir comprando

while (continuar) {
    // Solicita el nombre del producto
    let producto = prompt("Ingrese el nombre del producto que desea comprar:");
    
    // Solicita el precio y la cantidad
    let precio = parseFloat(prompt(`Ingrese el precio de la ${producto}:`));
    let cantidad = parseInt(prompt(`¿Cuántas unidades de ${producto} desea comprar?`));
    
    // Valida si hay descuento
    let descuento = 0;
    if (cantidad > 5) {
        descuento = 0.1;
        alert("¡Felicidades! Tienes un 10% de descuento por comprar más de 5 unidades.");
    }
    
    // Calcula el costo total
    let costoTotal = precio * cantidad * (1 - descuento);
    alert(`El costo total de ${cantidad} ${producto}(s) es: $${costoTotal.toFixed(2)}`);
    
    // Preguntar si deseo realizar otra compra
    let respuesta = prompt("¿Desea realizar otra compra? (si/no)").toLowerCase();
    continuar = respuesta === "si";
}

alert("Gracias por utilizar el simulador. ¡Hasta la próxima!");