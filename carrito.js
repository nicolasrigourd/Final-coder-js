

// Carrito en LocalStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];  // Cargar carrito si existe, si no, array vacío

// Elementos del DOM
const carritoIcon = document.querySelector('.carrito');
const cantidadProductos = document.querySelector('.cantidad-productos');
const carritoModal = document.getElementById('carritoModal');
const closeCarritoBtn = document.getElementById('closeCarritoBtn');
const continuarComprandoBtn = document.getElementById('continuarComprandoBtn');
const finalizarCompraBtn = document.getElementById('finalizarCompraBtn');
const carritoProductos = document.getElementById('carritoProductos');
const totalCarrito = document.getElementById('totalCarrito');

// Mostrar cantidad de productos en el icono del carrito
function actualizarCantidadCarrito() {
    cantidadProductos.textContent = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
}

// Mostrar productos en el carrito modal
function mostrarProductosEnCarrito() {
    carritoProductos.innerHTML = ''; // Limpiar contenido del carrito

    // Mostrar cada producto
    let total = 0;
    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-en-carrito');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" width="50">
            <span>${producto.nombre}</span>
            <span>$${producto.precio}</span>
            <span>Cantidad: ${producto.cantidad}</span>
            <button class="eliminar-producto" data-id="${producto.id}">Eliminar</button>
        `;
        carritoProductos.appendChild(productoDiv);
        total += parseFloat(producto.precio) * producto.cantidad; // Calcular total
    });

    totalCarrito.textContent = total.toFixed(2); // Actualizar el total
}

// Función para abrir el modal
carritoIcon.addEventListener('click', () => {
    carritoModal.style.display = 'flex';  // Mostrar modal
    mostrarProductosEnCarrito();  // Mostrar productos en el carrito
});

// Cerrar el modal
closeCarritoBtn.addEventListener('click', () => {
    carritoModal.style.display = 'none';  // Cerrar modal
});

// Continuar comprando (cerrar modal sin hacer nada)
continuarComprandoBtn.addEventListener('click', () => {
    carritoModal.style.display = 'none';  // Cerrar modal
});

// Finalizar compra (resetear carrito por simplicidad)
finalizarCompraBtn.addEventListener('click', () => {
   
    localStorage.removeItem('carrito');  // Limpiar carrito en localStorage
    carrito.length = 0;  // Limpiar carrito
    actualizarCantidadCarrito();  // Actualizar cantidad en el icono
    carritoModal.style.display = 'none';  // Cerrar modal
});

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    // Verificar si el producto ya existe en el carrito
    const index = carrito.findIndex(p => p.id === producto.id);

    if (index === -1) {
        // Si no existe, agregarlo al carrito
        carrito.push({ ...producto, cantidad: 1 });
            } else {
        // Si ya existe, incrementar la cantidad
        carrito[index].cantidad++;
            }

    // Guardar el carrito actualizado en LocalStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCantidadCarrito();  // Actualizar cantidad de productos en el icono
}

// Aquí se debe integrar con la lógica de los botones "Agregar al carrito" de los productos en el carrusel
// Esto lo haremos al interactuar con cada producto

// Ejemplo de cómo agregar productos (esto se deberá conectar con el botón de agregar carrito en los productos)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = {
            id: e.target.dataset.id,
            nombre: e.target.dataset.nombre,
            imagen: e.target.dataset.imagen,
            precio: parseFloat(e.target.dataset.precio)
        };
        agregarAlCarrito(producto);  // Agregar producto al carrito
    }
    });

// Función para eliminar un producto del carrito
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-producto')) {
        const productoId = e.target.dataset.id;
        eliminarProductoDelCarrito(productoId);
    }
});

// Función para eliminar un producto del carrito
function eliminarProductoDelCarrito(productoId) {
    const index = carrito.findIndex(p => p.id === productoId);
    if (index !== -1) {
        carrito.splice(index, 1); // Eliminar producto
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCantidadCarrito();
        mostrarProductosEnCarrito();
    }
}


/*============================== MODAL FINAL DE COMPRA ====================*/


// Función para abrir el modal de Resumen de Compra

function abrirResumenCompraModal() {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const resumenCompraModal = document.getElementById('resumenCompraModal');
    const productosCarrito = document.getElementById('productosCarrito');
    const totalResumenCarrito = document.getElementById('totalResumenCarrito');

    // Limpiar productos anteriores
    productosCarrito.innerHTML = '';

    // Si el carrito está vacío, mostrar mensaje
    if (carrito.length === 0) {
        productosCarrito.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalResumenCarrito.textContent = '0';
    } else {
        // Mostrar productos del carrito
        let total = 0;
        carrito.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto-en-carrito');
            productoDiv.innerHTML = `
                <span>${producto.nombre} (x${producto.cantidad})</span>
                <span>$${(producto.precio * producto.cantidad).toFixed(2)}</span>
            `;
            productosCarrito.appendChild(productoDiv);
            total += parseFloat(producto.precio) * producto.cantidad; // Sumar el precio total
        });
        
        totalResumenCarrito.textContent = total.toFixed(2); // Mostrar total
    }

    resumenCompraModal.style.display = 'flex';  // Mostrar el modal
}

// Función para cerrar el modal de Resumen de Compra
function cerrarResumenCompra() {
    const resumenCompraModal = document.getElementById('resumenCompraModal');
    resumenCompraModal.style.display = 'none';  // Cerrar el modal
}

// Eventos de botones
document.getElementById('pagoEfectivoBtn').addEventListener('click', () => {
    alert('Has elegido pagar en efectivo');
    cerrarResumenCompra();
});

document.getElementById('pagoMercadoPagoBtn').addEventListener('click', () => {
    alert('Has elegido pagar con MercadoPago');
    cerrarResumenCompra();
});

document.getElementById('closeResumenCompraBtn').addEventListener('click', cerrarResumenCompra);





