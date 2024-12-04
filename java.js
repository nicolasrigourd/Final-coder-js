//========================= LOGIN ====================

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formularioIngreso');  // Corregido el ID
    const mensajeError = document.getElementById('mensajeError'); // Para mostrar el mensaje de error

    // Función para iniciar sesión
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

        // Obtener los valores de los inputs
        const usuarioIngresado = document.getElementById('usuario').value;
        const claveIngresada = document.getElementById('clave').value;

        // Obtener los datos almacenados en localStorage
        const usuarioGuardado = localStorage.getItem('usuario');
        const claveGuardada = localStorage.getItem('clave');

        // Validar si los datos ingresados coinciden con los almacenados
        if (usuarioIngresado === usuarioGuardado && claveIngresada === claveGuardada) {
            // Si los datos son correctos, redirigir a home.html
            window.location.href = 'home.html';
        } else {
            // Si los datos no coinciden, mostrar mensaje de error
            mensajeError.textContent = 'Usuario o clave incorrectos. Por favor, inténtalo de nuevo.';
            
            // Limpiar el formulario
            formLogin.reset();
        }
    });
});









//=========================  REGISTRO  ===================================
document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');
    
    // Función para registrar el usuario
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

        // Obtener los valores de los inputs
        const usuario = document.getElementById('usuario').value;
        const clave = document.getElementById('clave').value;

        // Verificar si los campos no están vacíos
        if (usuario && clave) {
            // Guardar los datos en el localStorage
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('clave', clave);

            // Informar al usuario que el registro fue exitoso
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');

            // Redirigir al login (puedes eliminar esta línea si no quieres la redirección)
            window.location.href = 'index.html';
        } else {
            // Si los campos están vacíos, mostrar un mensaje de error
            alert('Por favor, completa todos los campos.');
        }
    });
});
