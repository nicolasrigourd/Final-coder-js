/*
    // Obtener el carrito desde localStorage
    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    // Función para mostrar los productos en el modal
    function mostrarCarritoEnModal() {
        const carrito = obtenerCarrito();
        const carritoResumen = document.getElementById('carritoResumenCompra');
        
        if (carrito.length > 0) {
            carritoResumen.innerHTML = '<ul>' +
                carrito.map(item => `
                    <li>
                        <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; margin-right: 10px;">
                        ${item.nombre} - ${item.cantidad} x $${item.precio}
                    </li>
                `).join('') +
                '</ul>';
        } else {
            carritoResumen.innerHTML = '<p>No hay productos en tu carrito.</p>';
        }
    }

    // Función para abrir el modal
    function abrirModalResumenCompra() {
        mostrarCarritoEnModal();  // Llamamos a la función para mostrar los productos en el modal
        document.getElementById('modalResumenCompra').style.display = 'block';
    }

    // Función para cerrar el modal
    function cerrarModalResumenCompra() {
        document.getElementById('modalResumenCompra').style.display = 'none';
    }

*/

    // Obtener el carrito desde localStorage
    function obtenerCarrito() {
        return JSON.parse(localStorage.getItem('carrito')) || [];
    }

    // Función para mostrar los productos en el modal y calcular el total
    function mostrarCarritoEnModal() {
        const carrito = obtenerCarrito();
        const carritoResumen = document.getElementById('carritoResumenCompra');
        const totalAPagar = document.getElementById('totalAPagar');
        
        // Calcular el total
        let total = 0;
        if (carrito.length > 0) {
            carritoResumen.innerHTML = '<ul>' +
                carrito.map(item => {
                    total += item.precio * item.cantidad; // Sumar precio * cantidad
                    return `
                        <li>
                            <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; margin-right: 10px;">
                            ${item.nombre} - ${item.cantidad} x $${item.precio}
                        </li>
                    `;
                }).join('') +
                '</ul>';
            totalAPagar.innerHTML = `Total a pagar: $${total.toFixed(2)}`;
        } else {
            carritoResumen.innerHTML = '<p>No hay productos en tu carrito.</p>';
            totalAPagar.innerHTML = 'Total a pagar: $0.00';
        }
    }

    // Función para abrir el modal
    function abrirModalResumenCompra() {
        mostrarCarritoEnModal();  // Llamamos a la función para mostrar los productos en el modal
        document.getElementById('modalResumenCompra').style.display = 'block';
    }

    // Función para cerrar el modal
    function cerrarModalResumenCompra() {
        document.getElementById('modalResumenCompra').style.display = 'none';
    }
    
    

    

    

    
  // Aquí podrías colocar el código para abrir el modal al hacer clic en algún botón, por ejemplo:
    // document.getElementById('btnAbrirModal').addEventListener('click', abrirModalResumenCompra);


