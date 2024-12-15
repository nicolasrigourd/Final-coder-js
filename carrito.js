
// Carrito en LocalStorage
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];  // Cargar carrito si existe, si no, array vacío


const carritoIcon = document.querySelector('.carrito');
const cantidadProductos = document.querySelector('.cantidad-productos');
const carritoModal = document.getElementById('carritoModal');
const closeCarritoBtn = document.getElementById('closeCarritoBtn');
const continuarComprandoBtn = document.getElementById('continuarComprandoBtn');
const finalizarCompraBtn = document.getElementById('finalizarCompraBtn');
const cancelarResumen =document.getElementById("btnCancelarCompra")
const carritoProductos = document.getElementById('carritoProductos');
const totalCarrito = document.getElementById('totalCarrito');
const  confirmarResumen = document.getElementById("btnConfirmarCompra")

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
};

// Función para abrir el modal con icono carrito
carritoIcon.addEventListener('click', () => {
    carritoModal.style.display = 'flex';  
    mostrarProductosEnCarrito();  
});

// Cerrar el modal carrito
closeCarritoBtn.addEventListener('click', () => {
    carritoModal.style.display = 'none'; 
});

// Continuar comprando (cerrar modal sin hacer nada)
continuarComprandoBtn.addEventListener('click', () => {
    carritoModal.style.display = 'none';  // Cerrar modal
});

// Finalizar compra 
finalizarCompraBtn.addEventListener('click', () => {
    abrirModalResumenCompra();
    /*localStorage.removeItem('carrito');  // Limpiar carrito en localStorage
    carrito.length = 0;  // Limpiar carrito*/
    actualizarCantidadCarrito();  // Actualizar cantidad en el icono
    carritoModal.style.display = 'none';  // Cerrar modal
});



cancelarResumen.addEventListener("click",()=>{
     abrirModalResumenCompra()
    carritoModal.style.display = 'flex'
    cerrarModalResumenCompra()
});



// ============= MODAL GRACIAS=================
function abrirModalGracias() {
    var modal = document.getElementById('modalGracias'); // Obtener el modal por su ID
    modal.style.display = 'flex'; // Hacer visible el modal (cambiar display a block)
};

function CerrarModalGracias(){
var modal = document.getElementById("modalGracias");
modal.style.display = "none";
};


confirmarResumen.addEventListener("click",()=>{
    abrirModalGracias()
    cerrarModalResumenCompra()
    setTimeout(CerrarModalGracias,3000);

localStorage.removeItem('carrito');  
    carrito.length = 0;  
    setTimeout(function() {
        location.reload();  
    }, 1000);  
    
});


// Función para agregar productos al carrito (localstorage)
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
};


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

// Función para eliminar un producto del carrito (localstorage)
function eliminarProductoDelCarrito(productoId) {
    const index = carrito.findIndex(p => p.id === productoId);
    if (index !== -1) {
        carrito.splice(index, 1); // Eliminar producto
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCantidadCarrito();
        mostrarProductosEnCarrito();
    }
};



