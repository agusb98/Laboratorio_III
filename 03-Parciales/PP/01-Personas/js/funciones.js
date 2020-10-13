var globalTr="";
var spinner = "";
var http = new XMLHttpRequest();
var contenedorAgregar="";
var email ="";
var pass = "";

window.onload = function () {
    PedirPersonasGet();
    var modificar = document.getElementById("btnModificar");
    spinner = document.getElementById("loader");
    var cerrar = document.getElementById("cerrar");
    cerrar.onclick=CerrarRecuadro;
    modificar.onclick=EditarPersonaPost;
    modificar.addEventListener("click",CerrarRecuadro);
    
    var eliminar = document.getElementById("btnEliminar");
    eliminar.onclick=EliminarPersonaPost;
    eliminar.addEventListener("click",CerrarRecuadro);
    var agregar = document.getElementById("btnAgregar");
    agregar.onclick= NuevaPersonaPostConParametros;
    agregar.addEventListener("click",CerrarRecuadro);

    email = document.getElementById("email");
    pass = document.getElementById("pass");
    var btnLogin = document.getElementById("btnLogin");
    btnLogin.onclick=Log;
}

function RealizarPeticionGet(metodo,url,funcion)
{
    spinner.hidden=false;
    http.onreadystatechange=funcion;
    http.open(metodo,url,true);
    http.send();
}

function RealizarPeticionPost(metodo,url,funcion) {
    spinner.hidden=false;
    http.onreadystatechange=funcion;
    http.open(metodo,url,true);   
    http.setRequestHeader("Content-Type","application/json");
            
    if (document.getElementById("nombre").value.length>=3 && document.getElementById("apellido").value.length>=3) {
        var data = {
            id:document.getElementById("id").value,
            nombre:document.getElementById("nombre").value,
            apellido:document.getElementById("apellido").value,
            fecha:document.getElementById("fecha").value,
            sexo:document.querySelector('input[name="gender"]:checked').value
        };
        http.send(JSON.stringify(data));
    }
    else {
        alert ("ERROR: en ingreso de datos");
        spinner.hidden=true;
    } 
}

function RealizarPeticionPostEliminar(metodo,url,funcion) {
    spinner.hidden=false;
    http.onreadystatechange=funcion;
    http.open(metodo,url,true);
    http.setRequestHeader("Content-Type","application/json");
    var data = {id:document.getElementById("id").value};
    http.send(JSON.stringify(data));
}

function RealizarPeticionPostNueva(metodo, url, funcion) {
    spinner.hidden=false;
    http.onreadystatechange=funcion;
    http.open(metodo,url,true);
    http.setRequestHeader("Content-Type","application/json");
    if (document.getElementById("nombre").value.length>=3 && document.getElementById("apellido").value.length>=3) {
        var data = {
            nombre:document.getElementById("nombre").value,
            apellido:document.getElementById("apellido").value,
            fecha:document.getElementById("fecha").value,
            sexo:document.querySelector('input[name="gender"]:checked').value
        };
        http.send(JSON.stringify(data));
    }
    else {
        alert("faltan datos");
        spinner.hidden=true;
    }
}

function Log() {
    RealizarLogin("POST","http://localhost:3000/login",login);
}

function RealizarLogin(metodo, url, funcion) {
    http.onreadystatechange=funcion;
    http.open(metodo,url,true);
    http.setRequestHeader("Content-Type","application/json");
    var data = {email:email.value,password:pass.value};
    http.send(JSON.stringify(data));
}

function login() {
    if (http.readyState == 4 && http.status == 200) {
        Loguear(JSON.parse(http.responseText)); 
    }
}

function Loguear(login) {
    console.log(login.type);
}

function callback() {
    if (http.readyState == 4 && http.status == 200) {
        armarGrilla(JSON.parse(http.responseText)); 
        spinner.hidden=true;            
    }
}

function respuesta() {
    if (http.readyState == 4 && http.status == 200) { 
        Modificar(JSON.parse(http.responseText));
        spinner.hidden=true; 
    }
}

function dPersona() {
    if (http.readyState==4 && http.status==200) {
        Eliminar(JSON.parse(http.responseText));
        spinner.hidden=true; 
    }
}

function nueva() {
    if (http.readyState==4 && http.status==200) {
        //console.log(JSON.parse(http.responseText));
        Agregar(JSON.parse(http.responseText));
        spinner.hidden=true; 
    }
}

function PedirPersonasGet() {
    RealizarPeticionGet("GET","http://localhost:3000/personas",callback);
}

function NuevaPersonaPostConParametros() {
    RealizarPeticionPostNueva("POST","http://localhost:3000/nueva", nueva);
}

function EditarPersonaPost() {
    RealizarPeticionPost("POST","http://localhost:3000/editar",respuesta);
}

function EliminarPersonaPost() {
    RealizarPeticionPostEliminar("POST","http://localhost:3000/eliminar",dPersona);
}

function armarGrilla(jsonObj) {
    var tabla = document.getElementById("tabla");

    for(var i = 0;i<jsonObj.length;i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(document.createTextNode(jsonObj[i].nombre));
        tr.appendChild(td);

        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(jsonObj[i].apellido));
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(jsonObj[i].fecha));
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.appendChild(document.createTextNode(jsonObj[i].sexo));
        tr.appendChild(td4); 

        var td5 = document.createElement("td");
        td5.appendChild(document.createTextNode(jsonObj[i].id));
        td5.hidden=true;
        tr.appendChild(td5);

        tr.addEventListener("dblclick",AbrirRecuadro);
        tabla.appendChild(tr);
    }
}
        
function AbrirRecuadro(e) {
    var recuadro = document.getElementById("contenedorAgregar");
    contenedorAgregar=recuadro;
    recuadro.hidden=false;
    var tr = e.target.parentNode;
    globalTr=tr;//la solucion estaba aca
    document.getElementById("nombre").value = tr.childNodes[0].innerHTML;
    document.getElementById("apellido").value = tr.childNodes[1].innerHTML;
    document.getElementById("fecha").value = tr.childNodes[2].innerHTML;
    document.getElementById("id").value = tr.childNodes[4].innerHTML;
            
    if (tr.childNodes[3].innerHTML=="Female") {
        document.getElementById("female").checked=true;
        document.getElementById("male").checked=false;
    }
    else if (tr.childNodes[3].innerHTML=="Male") {
        document.getElementById("male").checked=true;
        document.getElementById("female").checked=false;
    }
}

function Modificar(persona) {
    globalTr.childNodes[0].innerHTML = persona.nombre;
    globalTr.childNodes[1].innerHTML = persona.apellido;
    globalTr.childNodes[2].innerHTML= persona.fecha;
    globalTr.childNodes[3].innerHTML = persona.sexo;
    spinner.hidden=true;
}

function Agregar(persona){
    var tabla = document.getElementById("tabla");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    td.appendChild(document.createTextNode(persona.nombre));
    tr.appendChild(td);

    var td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(persona.apellido));
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(persona.fecha));
    tr.appendChild(td3);

    var td4 = document.createElement("td");
    td4.appendChild(document.createTextNode(persona.sexo));
    tr.appendChild(td4); 

    var td5 = document.createElement("td");
    td5.appendChild(document.createTextNode(persona.id));
    td5.hidden=true;
            
    tr.addEventListener("dblclick",AbrirRecuadro); 
    tabla.appendChild(tr);
}

function Eliminar() {
    globalTr.remove();
}

function CerrarRecuadro() {
    var recuadro = document.getElementById("contenedorAgregar");
    recuadro.hidden=true;
}