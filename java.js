// index/ LOGIN

const usuario = document.getElementById("usuario")
const clave = document.getElementById("clave")
const btnregistro = document.getElementById("registrarse")

// guardar datos de registro
const registro =()=>{
    const user = usuario.value
    const pass = clave.value
      localStorage.setItem("usuario",user)
      localStorage.setItem("clave",pass)
      console.log(user);
      console.log(pass);
}
      
btnregistro.addEventListener("click",registro)
      
//==============================================================
// ingreso

const btningreso = document.getElementById("ingresar")
const validarUsuario =()=>{
    const user = localStorage.getItem("usuario")
    const pass = localStorage.getItem("clave")

    if(usuario.value=== user && clave.value===pass){
        alert("Bienvenido "  +  user)
        window.location.href = "home.html"
    }else{
        alert("Usuario o clave incorrectas")
    }

}
btningreso.addEventListener("click",validarUsuario)

//===============================================
// HOME


