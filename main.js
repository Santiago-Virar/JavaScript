// Variables iniciales
let carrito = [];
let total = 0;

// Array de productos
const productos = [
    { id: 1, nombre: "Funda para celular", precio: 1500 },
    { id: 2, nombre: "Cargador", precio: 2500 },
    { id: 3, nombre: "Auriculares", precio: 3500 }
];

function mostrarProductos() {
    console.log("Productos disponibles:");
    productos.forEach(producto => console.log(`${producto.id}. ${producto.nombre} - $${producto.precio}`));
}

function agregarAlCarrito() {
    let productoId = parseInt(prompt("Ingrese el ID del producto que desea comprar:"));
    let cantidad = parseInt(prompt("Ingrese la cantidad:"));

    let productoSeleccionado = productos.find(p => p.id === productoId);
    if (productoSeleccionado) {
        carrito.push({ ...productoSeleccionado, cantidad });
        total += productoSeleccionado.precio * cantidad;
        console.log(`${productoSeleccionado.nombre} x${cantidad} agregado al carrito.`);
    } else {
        console.log("Producto no encontrado.");
    }
}

function mostrarCarrito() {
    console.log("Carrito actual:");
    carrito.forEach(item => {
        console.log(`${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`);
    });
    console.log(`Total: $${total}`);
}

function finalizarCompra() {
    if (carrito.length > 0) {
        console.log("Compra finalizada. Gracias por su compra.");
        console.log("Total a pagar:", total);
        alert(`Compra finalizada. Total a pagar: $${total}`);
    } else {
        console.log("El carrito está vacío.");
    }
}

mostrarProductos();

let continuar = true;
while (continuar) {
    agregarAlCarrito();
    continuar = confirm("¿Desea agregar otro producto?");
}

mostrarCarrito();
finalizarCompra();

function filtrarProductosPorPrecio(maxPrecio) {
    return productos.filter(p => p.precio <= maxPrecio);
}
let presupuesto = parseInt(prompt("Ingrese su presupuesto:"));
console.log("Productos dentro del presupuesto:");
console.log(filtrarProductosPorPrecio(presupuesto));

function buscarProducto(nombre) {
    return productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
}
let buscar = prompt("Ingrese el nombre del producto que desea buscar:");
console.log(buscarProducto(buscar));

