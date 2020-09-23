//Avisa cuando terminó de cargar la Página y luego utiliza la funcion Cargar
window.addEventListener("load", Cargar);

function Cargar()
{
    var boton = document.getElementById("btnEnviar");

    //tambien funciona reemplazando ValidarUsusario por function()
    //boton.addEventListener("click", ValidarUsuario);
}

function ValidarUsuario()
{
    var user = document.getElementById("usr").value;
    var pass = document.getElementById("pass").value;

    if(user == "usuario" && pass == "1234"){
        alert("Todo Correcto");
    }
    else{
        alert("Error");
    }
}