
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


document.addEventListener('DOMContentLoaded', () => {
    const saludo = document.getElementById('saludo-usuario');  // Seleccionamos el span donde se mostrará el saludo

    // Obtener el nombre del usuario desde el localStorage y mostrarlo en el saludo
    const usuario = localStorage.getItem('usuario');
    saludo.textContent = `Hola ${usuario}`;  // Añadimos el saludo con el nombre del usuario
});







//=========================  REGISTRO  ===================================
document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');  // Corregí el ID del formulario
    const usuarioInput = document.getElementById('usuario-reg');
    const claveInput = document.getElementById('clave-reg');
    const errorMensaje = document.getElementById('errorMensaje'); // Ahora sí existe el elemento en HTML

    // Función para registrar el usuario
    formRegistro.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional

        // Obtener los valores de los inputs
        const usuario = usuarioInput.value.trim();
        const clave = claveInput.value.trim();

        // Limpiar cualquier mensaje de error previo
        errorMensaje.textContent = '';

        // Verificar si el usuario ya existe en localStorage
        if (localStorage.getItem('usuario') === usuario) {
            errorMensaje.textContent = 'Este nombre de usuario ya está registrado.';
            return;
        }

        // Verificar que el nombre de usuario y la contraseña no estén vacíos
        if (usuario === '' || clave === '') {
            errorMensaje.textContent = 'Por favor, completa todos los campos.';
            return;
        }

        // Guardar los datos en el localStorage
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
        }, 1500); // La redirección ocurre después de 1.5 segundos
    });
});



