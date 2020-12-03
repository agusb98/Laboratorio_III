var http = new XMLHttpRequest;
var arrayObj = new Array();

window.onload = function () {
    getMaterias("GET", "http://localhost:3000/materias", GetGrilla);

    var eventoClick = document.getElementById("tCuerpo");
    eventoClick.addEventListener("dblclick", GetMateria);
    
    var btnCerrar = document.getElementById("btnCerrar");
    btnCerrar.addEventListener("click", closeHeader);
    
    var btnEliminar = document.getElementById("btnEliminar");
    btnEliminar.addEventListener("click", Eliminar);
    
    var btnModificar = document.getElementById("btnModificar");
    btnModificar.addEventListener("click", Modificar);
    
    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", Agregar);
}

function getMaterias(verb, link, action){
    http.onreadystatechange = action;
    http.open(verb, link, true);
    http.send();
}

function GetGrilla() {
    ShowSpinner(true);
    if (http.readyState == 4 && http.status == 200) {
        armarGrilla(JSON.parse(http.responseText));
        ShowSpinner(false);
    }
}

function armarGrilla(jsonObj) {
    tCuerpo = document.getElementById("tCuerpo");
    console.log("Cantidad de Elementos: ", jsonObj.length);

    for (var i = 0; i < jsonObj.length; i++) {
        var row = document.createElement("tr");
        row.setAttribute("idMaterias", jsonObj[i].id); 

        var cel0 = document.createElement("td");
        var text0 = document.createTextNode(jsonObj[i].id);
        cel0.appendChild(text0);
        row.appendChild(cel0);
        cel0.hidden = true;

        var cel1 = document.createElement("td");
        var text1 = document.createTextNode(jsonObj[i].nombre);
        cel1.appendChild(text1);
        row.appendChild(cel1);

        var cel2 = document.createElement("td");
        var text2 = document.createTextNode(jsonObj[i].cuatrimestre);
        cel2.appendChild(text2);
        row.appendChild(cel2);

        var cel3 = document.createElement("td");
        var text3 = document.createTextNode(jsonObj[i].fechaFinal);
        cel3.appendChild(text3);
        row.appendChild(cel3);

        var cel4 = document.createElement("td");
        var text4 = document.createTextNode(jsonObj[i].turno);
        cel4.appendChild(text4);
        row.appendChild(cel4);

        tCuerpo.appendChild(row);
    }
}

function GetMateria(e) {
    obj = e.target.parentNode;
    document.getElementById("nombre").value = obj.childNodes[1].innerHTML;
    document.getElementById("cuatrimestre").value = obj.childNodes[2].innerHTML;
    
    var arrayFechaFinal = obj.childNodes[3].innerHTML.split("/");
    var auxFecha = arrayFechaFinal[2] + "-" + arrayFechaFinal[1] + "-" + arrayFechaFinal[0];
    document.getElementById("fechaFinal").value = auxFecha;

    if (obj.childNodes[4].innerHTML == "Mañana") {
        document.getElementById("mañana").checked = true;
    } 
    else { document.getElementById("noche").checked = true; }

    rowGlobal = obj;
    ShowHeader(true);
}

function Eliminar(e) {
    if(confirm("Desea efectuar los cambios?")){
        ShowSpinner(true);
        ShowHeader(false);
        
        http.onreadystatechange = function () {
            if (http.readyState == 4 && http.status == 200) {
                rowGlobal.remove();
                ShowSpinner(true);
            }
        }
        http.open("POST", "http://localhost:3000/eliminar", true);
        http.setRequestHeader("Content-Type", "application/json");
        
        var json = { "id": rowGlobal.getAttribute("idMaterias") };
        http.send(JSON.stringify(json));
    }
}

function Agregar(e) {
    var data = Materia_GetElementsById();

    if (checkNombre(data[0])) {
        if (checkFechaFinal(data[2])) {
            if(confirm("Desea efectuar los cambios?")) {
                ShowSpinner(true);
                ShowHeader(false);
                endPoint("POST", "http://localhost:3000/nueva", formatParams("POST", data), agregarMateria); 
            } 
        }
    }
}

function agregarMateria() {
    if (http.readyState === 4 && http.status === 200) {
        ShowSpinner(false);
    }
}

function Modificar(e) {
    var data = Materia_GetElementsById();

    if (checkNombre(data[0])) {
        if (checkFechaFinal(data[2])) {
            if(confirm("Desea efectuar los cambios?")) {
                ShowSpinner(true);
                ShowHeader(false);
                endPoint("POST", "http://localhost:3000/editar", formatParams("POST", data), modificarMateria); 
            } 
        }
    }
}

function endPoint(verb, route, params, callback) {
    if (verb === "GET") {
        http.onreadystatechange = callback;
        http.open(verb, route + params, true);
        request.send();
    } 
    else if (verb === "POST") {
        http.onreadystatechange = callback;
        http.open(verb, route, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(params);
    }
}

function modificarMateria() {
    if (http.readyState === 4 && http.status === 200) {
        var id = document.getElementById("id");
        var body = document.getElementById("tCuerpo");
        var idToModify = id.rowId;
        var rows = body.rows;
        
        for (let index = 0; index < rows.length; index++) {
            if (rows[index].id == idToModify) {
                rows[index].firstElementChild.textContent = arrayObj[0];
                rows[index].firstElementChild.nextElementSibling.textContent = arrayObj[1];
                rows[index].firstElementChild.nextElementSibling.nextElementSibling.textContent = setFormatDate(arrayObj[2], "-", "/");
                rows[index].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.textContent = arrayObj[3];
            }
        }
        ShowSpinner(false);
    }
}

function formatParams(verb, array) {
    if(verb == "GET"){
        return "?usr=" + array[0].value + "&pass=" + array[1].value;
    }
    else if(verb == "POST"){
        var json = {
                id: rowGlobal.getAttribute("idMaterias"),
                nombre: array[0],
                cuatrimestre: array[1],
                fechaFinal: array[2],
                turno: array[3]
            }
        return JSON.stringify(json);
    }
}

function Materia_GetElementsById(){
    var array = new Array();

    array[0] = document.getElementById("nombre").value;
    array[1] = document.getElementById("cuatrimestre").value;
    array[2] = setFormatDate(document.getElementById("fechaFinal").value, "-", "/");

    var radio = document.getElementsByName("turno");
    for (i = 0; i < radio.length; i++) {
        if (radio[i].checked) { array[3] = "Noche"; }
        else{ array[3] = "Mañana"; }
    }

    arrayObj = array;
    return array;
}

function ShowSpinner(status = true){
    if(status) { document.getElementById("spinner").hidden = false; }
    else{ document.getElementById("spinner").hidden = true; }
}

function ShowHeader(status = true){
    if(status) { document.getElementById("contenedor").hidden = false; }
    else{ document.getElementById("contenedor").hidden = true; }
}

function closeHeader(){
    ShowHeader(false);
}

function checkNombre(nombre) {
    if(nombre.length >= 6){
        document.getElementById("nombre").className = "classSinError";
        return true;
    }
    else{
        document.getElementById("nombre").className = "classError";
        return false;   
    }
}

function checkFechaFinal(fecha) {
    if(new Date(fecha) > new Date()){
        document.getElementById("fechaFinal").className = "classSinError";
        return true;
    }
    else{
        document.getElementById("fechaFinal").className = "classError";
        return false;   
    }
}

function setFormatDate(date, splitBy, printBy){
    var dateAux = date.split(splitBy);
    return dateAux[2] + printBy + dateAux[1] + printBy + dateAux[0];
}