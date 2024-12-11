
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
    const usuarioInput = document.getElementById('usuario');
    const claveInput = document.getElementById('clave');
    const errorMensaje = document.getElementById('errorMensaje'); // Elemento donde mostraremos los errores

    // Función para registrar el usuario
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

        // Obtener los valores de los inputs
        const usuario = usuarioInput.value.trim();
        const clave = claveInput.value.trim();

        // Limpiar cualquier mensaje de error previo
        errorMensaje.textContent = '';
        
        // Verificar si los campos no están vacíos
        if (!usuario || !clave) {
            errorMensaje.textContent = 'Por favor, completa todos los campos.';
            return;
        }

        // Verificar si la contraseña tiene al menos 4 caracteres
        if (clave.length < 4) {
            errorMensaje.textContent = 'La contraseña debe tener al menos 4 caracteres.';
            return;
        }

        // Verificar si el usuario ya existe en localStorage
        if (localStorage.getItem('usuario') === usuario) {
            errorMensaje.textContent = 'Este nombre de usuario ya está registrado.';
            return;
        }

        // Guardar los datos en el localStorage (se puede considerar mejorar esto a un sistema de almacenamiento más seguro)
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('clave', clave);

        // Mostrar un mensaje de éxito en el formulario
        const successMensaje = document.createElement('div');
        successMensaje.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
        successMensaje.style.color = 'green';
        successMensaje.style.marginTop = '10px';
        formRegistro.appendChild(successMensaje);

        // Redirigir al login después de un breve tiempo (para mostrar el mensaje de éxito)
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000); // Redirige después de 2 segundos
    });
});
