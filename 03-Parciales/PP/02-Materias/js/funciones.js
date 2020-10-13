var globalTr="";
var spinner = "";
var http = new XMLHttpRequest();
var contenedorAgregar="";
var email ="";
var pass = "";

window.onload = function () {
    pedirMateriasGet();
    var modificar = document.getElementById("btnModificar");
    spinner = document.getElementById("loader");

    var cerrar = document.getElementById("cerrar");
    cerrar.onclick = cerrarRecuadro;
    modificar.onclick = editarMateriaPost;
    modificar.addEventListener("click", cerrarRecuadro);
    
    var eliminar = document.getElementById("btnEliminar");
    eliminar.onclick = eliminarMateriaPost;
    eliminar.addEventListener("click", cerrarRecuadro);
    
    /*
    var agregar = document.getElementById("btnAgregar");
    agregar.onclick = nuevaMateriaPostConParametros;
    agregar.addEventListener("click", cerrarRecuadro);
    */

    /*
    email = document.getElementById("email");
    pass = document.getElementById("pass");
    var btnLogin = document.getElementById("btnLogin");
    btnLogin.onclick = log;
    */
}

function realizarPeticionGet(metodo, url, funcion) {
    spinner.hidden = false;
    http.onreadystatechange = funcion;
    http.open(metodo, url, true);
    http.send();
}

function realizarPeticionPost(metodo, url, funcion) {
    spinner.hidden = false;
    http.open(metodo, url, true);   
    http.setRequestHeader("Content-Type","application/json");
    
    if (document.getElementById("nombre").value.length > 6 && 
    document.getElementById("cuatrimestre").value < 5 && 
    document.getElementById("cuatrimestre").value > 0 &&
    document.getElementById("fechaFinal").value) 
    {
        var auxFecha = (document.getElementById("fechaFinal").value).split('-');
        var data = {
            id:document.getElementById("id").value,
            nombre:document.getElementById("nombre").value,
            cuatrimestre:document.getElementById("cuatrimestre").value,
            fechaFinal:auxFecha[2] + '/' + auxFecha[1] + '/' + auxFecha[0],
            turno:document.querySelector('input[name="gender"]:checked').value
        };
        http.send(JSON.stringify(data));
        http.onreadystatechange = funcion;
    }
    else {
        alert ("ERROR: en ingreso de datos");
        spinner.hidden = true;
    } 
}

function realizarPeticionPostEliminar(metodo, url, funcion) {
    spinner.hidden = false;
    http.onreadystatechange = funcion;
    http.open(metodo, url, true);
    http.setRequestHeader("Content-Type", "application/json");
    var data = {id:document.getElementById("id").value};
    http.send(JSON.stringify(data));
}

function realizarPeticionPostNueva(metodo, url, funcion) {
    spinner.hidden = false;
    http.onreadystatechange = funcion;
    http.open(metodo, url, true);
    http.setRequestHeader("Content-Type","application/json");
    if (document.getElementById("nombre").value.length > 6 && 
        document.getElementById("cuatrimestre").value < 5 && 
        document.getElementById("cuatrimestre").value > 0 &&
        document.getElementById("fechaFinal").value) 
    {
        var auxFecha = (document.getElementById("fechaFinal").value).split('-');
        var data = {
            nombre:document.getElementById("nombre").value,
            cuatrimestre:document.getElementById("cuatrimestre").value,
            fechaFinal:auxFecha[2] + '/' + auxFecha[1] + '/' + auxFecha[0],
            turno:document.querySelector('input[name="gender"]:checked').value
        };
        http.send(JSON.stringify(data));
    }
    else {
        alert("ERROR: en ingreso de datos");
        spinner.hidden = true;
    }
}

function log() {
    realizarLogin("POST","http://localhost:3000/login", login);
}

function realizarLogin(metodo, url, funcion) {
    http.onreadystatechange = funcion;
    http.open(metodo, url, true);
    http.setRequestHeader("Content-Type","application/json");
    var data = {email:email.value,password:pass.value};
    http.send(JSON.stringify(data));
}

function login() {
    if (http.readyState == 4 && http.status == 200) {
        loguear(JSON.parse(http.responseText)); 
    }
}

function loguear(login) {
    console.log(login.type);
}

function callback() {
    if (http.readyState == 4 && http.status == 200) {
        armarGrilla(JSON.parse(http.responseText)); 
        spinner.hidden = true;            
    }
}

function respuesta() {
    if (http.readyState == 4 && http.status == 200) { 
        modificar(JSON.parse(http.responseText));
        spinner.hidden = true; 
    }
}

function dMateria() {
    if (http.readyState == 4 && http.status == 200) {
        eliminar(JSON.parse(http.responseText));
        spinner.hidden = true; 
    }
}

function nueva() {
    if (http.readyState == 4 && http.status == 200) {
        agregar(JSON.parse(http.responseText));
        spinner.hidden = true; 
    }
}

function pedirMateriasGet() {
    realizarPeticionGet("GET", "http://localhost:3000/materias", callback);
}


function nuevaMateriaPostConParametros() {
    realizarPeticionPostNueva("POST","http://localhost:3000/nueva", nueva);
}


function editarMateriaPost() {
    realizarPeticionPost("POST", "http://localhost:3000/editar", respuesta);
}

function eliminarMateriaPost() {
    realizarPeticionPostEliminar("POST", "http://localhost:3000/eliminar", dMateria);
}

function armarGrilla(jsonObj) {
    var tabla = document.getElementById("tabla");

    for(var i = 0; i < jsonObj.length; i++) {
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        
        td.appendChild(document.createTextNode(jsonObj[i].nombre));
        tr.appendChild(td);

        var td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(jsonObj[i].cuatrimestre));
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(jsonObj[i].fechaFinal));
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.appendChild(document.createTextNode(jsonObj[i].turno));
        tr.appendChild(td4); 

        var td5 = document.createElement("td");
        td5.appendChild(document.createTextNode(jsonObj[i].id));
        td5.hidden = true;
        tr.appendChild(td5);

        tr.addEventListener("dblclick", abrirRecuadro);
        tabla.appendChild(tr);
    }
}
        
function abrirRecuadro(e) {
    var recuadro = document.getElementById("contenedorAgregar");
    contenedorAgregar = recuadro;
    recuadro.hidden = false;
    var tr = e.target.parentNode;
    globalTr = tr;//la solucion estaba aca

    document.getElementById("nombre").value = tr.childNodes[0].innerHTML;
    document.getElementById("cuatrimestre").value = tr.childNodes[1].innerHTML; 
    
    document.getElementById("fechaFinal").value = tr.childNodes[2].innerHTML;
    document.getElementById("id").value = tr.childNodes[4].innerHTML;
            
    if (tr.childNodes[3].innerHTML == "Mañana") {
        document.getElementById("mañana").checked = true;
        document.getElementById("noche").checked = false;
    }
    else if (tr.childNodes[3].innerHTML == "Noche") {
        document.getElementById("noche").checked = true;
        document.getElementById("mañana").checked = false;
    }
}

function modificar(materia) {
    globalTr.childNodes[0].innerHTML = materia.nombre;
    globalTr.childNodes[1].innerHTML = materia.cuatrimestre;
    globalTr.childNodes[2].innerHTML= materia.fechaFinal;
    globalTr.childNodes[3].innerHTML = materia.turno;
    spinner.hidden = true;
}

function agregar(materia){
    var tabla = document.getElementById("tabla");
    var tr = document.createElement("tr");
    var td = document.createElement("td");

    td.appendChild(document.createTextNode(materia.nombre));
    tr.appendChild(td);

    var td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(materia.cuatrimestre));
    tr.appendChild(td2);

    var td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(materia.fechaFinal));
    tr.appendChild(td3);

    var td4 = document.createElement("td");
    td4.appendChild(document.createTextNode(materia.turno));
    tr.appendChild(td4); 

    var td5 = document.createElement("td");
    td5.appendChild(document.createTextNode(materia.id));
    td5.hidden = true;
            
    tr.addEventListener("dblclick", abrirRecuadro); 
    tabla.appendChild(tr);
}

function eliminar() {
    globalTr.remove();
}

function cerrarRecuadro() {
    var recuadro = document.getElementById("contenedorAgregar");
    recuadro.hidden = true;
}