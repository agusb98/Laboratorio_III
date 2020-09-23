function ClickGuardar()
{
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");

    //className no fue creada por mi, marca en rojo el formulario si se encuentra vacio
    
    if(nombre.value == ""){
        nombre.className="inputError";
        return;
    }
    nombre.className="inputSinError";

    if(apellido.value == ""){
        apellido.className="inputError";
        return;
    }
    apellido.className="inputSinError";
    
    var tcuerpo = document.getElementById("tcuerpo");
    tcuerpo.innerHTML = tcuerpo.innerHTML +"<tr><td>"+nombre.value+"</td><td>"+ 
    apellido.value + "</td><td><a href="+"#"+">borrar</a></td></tr>";
}

function ClickAbrir()
{
    var cont = document.getElementById("contenedor");
    cont.hidden = false;
}

function ClickCancelar()
{
    var cont = document.getElementById("contenedor");
    cont.hidden = true;
}
