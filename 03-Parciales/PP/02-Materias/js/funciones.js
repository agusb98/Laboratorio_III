var globalTr = "";
var spinner = "";
var http = new XMLHttpRequest();
var contenedorAgregar = "";
var email = "";
var pass = "";

window.onload = function () {
    pedirMateriasGet();

    var modificar = document.getElementById("btnModificar");
    spinner = document.getElementById("loader");

    var cerrar = document.getElementById("btnCerrar");
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

    email = document.getElementById("email");
    pass = document.getElementById("pass");
    var btnLogin = document.getElementById("btnLogin");
    btnLogin.onclick = Log;
    */
}

function peticionGet(metodo, url, funcion) {
    spinner.hidden = false;
    http.onreadystatechange = funcion;
    http.open(metodo, url, true);
    http.send();
}

function peticionPostEditar(metodo, url, funcion) {
    spinner.hidden = false;
    http.onreadystatechange = funcion;
    http.open(metodo, url, true);   
    http.setRequestHeader("Content-Type","application/json");

    if(checkName(document.getElementById("nombre").value)) {
        var fechaFinal = (document.getElementById("fechaFinal").value).split('-');
        var fechaFinalCorrecta = fechaFinal[2] + '/' + fechaFinal[1] + '/' + fechaFinal[0];

        var data = {
            id:document.getElementById("id").value,
            nombre:document.getElementById("nombre").value,
            cuatrimestre:document.getElementById("cuatrimestre").value,
            fechaFinal:fechaFinalCorrecta,
            turno:document.querySelector('input[name="gender"]:checked').value
        };
        http.send(JSON.stringify(data));
    }
}

function peticionPostEliminar(metodo, url, funcion) {
    spinner.hidden = false;
    http.onreadystatechange = funcion;
    http.open(metodo, url, true);
    http.setRequestHeader("Content-Type","application/json");
    var data = {id:document.getElementById("id").value};
    http.send(JSON.stringify(data));
}

function peticionPostNueva(metodo, url, funcion) {
    spinner.hidden = false;
    http.onreadystatechange = funcion;
    http.open(metodo, url, true);
    http.setRequestHeader("Content-Type","application/json");

    if(checkName(document.getElementById("nombre").value)) {
        var fechaFinal = (document.getElementById("fechaFinal").value).split('-');
        var fechaFinalCorrecta = fechaFinal[2] + '/' + fechaFinal[1] + '/' + fechaFinal[0];

        var data = {
            nombre:document.getElementById("nombre").value,
            cuatrimestre:document.getElementById("cuatrimestre").value,
            fechaFinal:fechaFinalCorrecta,
            turno:document.querySelector('input[name="gender"]:checked').value
        };
        http.send(JSON.stringify(data));
    }
}

/*
function Log() {
    RealizarLogin("POST","http://localhost:3000/login", login);
}

function RealizarLogin(metodo, url, funcion) {
    http.onreadystatechange = funcion;
    http.open(metodo, url, true);
    http.setRequestHeader("Content-Type","application/json");
    var data = {email:email.value, password:pass.value};
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
*/

function materias() {
    if (http.readyState == 4 && http.status == 200) {
        armarGrilla(JSON.parse(http.responseText)); 
        spinner.hidden = true;            
    }
}

function editar() {
    if (http.readyState == 4 && http.status == 200) { 
        modificar(JSON.parse(http.responseText));
        spinner.hidden = true; 
    }
}

function eliminarMateria() {
    if (http.readyState == 4 && http.status == 200) {
        eliminar(JSON.parse(http.responseText));
        spinner.hidden=true; 
    }
}

function nueva() {
    if (http.readyState == 4 && http.status == 200) {
        agregar(JSON.parse(http.responseText));
        spinner.hidden = true; 
    }
}

function pedirMateriasGet() {
    peticionGet("GET","http://localhost:3000/materias", materias);
}

function nuevaMateriaPostConParametros() {
    peticionPostNueva("POST","http://localhost:3000/nueva", nueva);
}

function editarMateriaPost() {
    peticionPostEditar("POST","http://localhost:3000/editar", editar);
}

function eliminarMateriaPost() {
    peticionPostEliminar("POST","http://localhost:3000/eliminar", eliminarMateria);
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

function checkName(nombre) {
    if(nombre.length < 6) {
        document.getElementById("nombre").className = "classError";
        alert("ERROR: en el ingreso de datos");
        return false;
    }     
    return true;           
}