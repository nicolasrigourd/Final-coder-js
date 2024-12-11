
// Función para cargar los productos desde el archivo JSON
function cargarProductos() {
    fetch('productos.json')
        .then(response => response.json())
        .then(productosJson => {
            // Limpiar los contenedores de productos
            const contenedorGolosinas = document.getElementById('productos-lista-golosinas');
            const contenedorBebidas = document.getElementById('productos-lista-bebidas');

            contenedorGolosinas.innerHTML = '';
            contenedorBebidas.innerHTML = '';

            // Filtrar y renderizar productos por categoría
            productosJson.forEach(producto => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto');
                productoDiv.setAttribute('data-id', producto.id);

                productoDiv.innerHTML = `
                    <img src="${producto.img}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <span>$${producto.precio}</span>
                    <button class="agregar-carrito" data-id="${producto.id}" data-nombre="${producto.nombre}" data-imagen="${producto.img}" data-precio="${producto.precio}">Agregar al carrito</button>
                `;

                // Distribuir los productos según su categoría
                if (producto.categoria === 'golosinas') {
                    contenedorGolosinas.appendChild(productoDiv);
                } else if (producto.categoria === 'bebidas alcoholicas') {
                    contenedorBebidas.appendChild(productoDiv);
                }
            });

            // Llamar a la función de gestión del carrusel después de cargar los productos
            gestionarCarrusel();
        })
        .catch(error => {
            console.error("Error al cargar los productos:", error);
        });
}

// Función para gestionar el carrusel
function gestionarCarrusel() {
    const carruseles = document.querySelectorAll('.carrusel-contenedor');

    carruseles.forEach(carrusel => {
        const prevButton = carrusel.querySelector(".carrusel-prev");
        const nextButton = carrusel.querySelector(".carrusel-next");
        const productosContenedor = carrusel.querySelector(".productos");

        let posicion = 0;
        const totalProductos = productosContenedor.children.length;
        const intervalTime = 3000; // 3 segundos para el carrusel automático
        let intervalo;

        // Función para mover el carrusel hacia atrás
        prevButton.addEventListener("click", function () {
            if (posicion > 0) {
                posicion--;
                actualizarCarrusel();
            }
        });

        // Función para mover el carrusel hacia adelante
        nextButton.addEventListener("click", function () {
            if (posicion < totalProductos - 1) {
                posicion++;
                actualizarCarrusel();
            }
        });

        // Función para actualizar la posición del carrusel
        function actualizarCarrusel() {
            productosContenedor.style.transform = `translateX(-${posicion * 270}px)`; // Ajustar el desplazamiento según el tamaño
        }

        // Función para mover el carrusel de manera automática
        function moverAutomatico() {
            posicion++;
            if (posicion >= totalProductos) {
                posicion = 0; // Reiniciar al principio
            }
            actualizarCarrusel();
        }

        // Iniciar el carrusel automático
        function iniciarCarrusel() {
            intervalo = setInterval(moverAutomatico, intervalTime);
        }

        // Detener el carrusel cuando el mouse se posa sobre un producto
        function detenerCarrusel() {
            clearInterval(intervalo);
        }

        // Reanudar el carrusel cuando el mouse sale de un producto
        function reanudarCarrusel() {
            iniciarCarrusel();
        }

        // Agregar los eventos a cada producto para detener y reanudar el carrusel
        const productosElementos = carrusel.querySelectorAll(".producto");
        productosElementos.forEach(producto => {
            producto.addEventListener("mouseover", detenerCarrusel);
            producto.addEventListener("mouseleave", reanudarCarrusel);
        });

        // Iniciar carrusel automático
        iniciarCarrusel();
    });
}

// Llamar a la función de carga de productos cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function () {
    cargarProductos();  // Cargar los productos desde el archivo JSON
});
