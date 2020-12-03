var http = new XMLHttpRequest;
var trClick;
var rowGlobal;

window.onload = function () {
    document.getElementById("spinner").hidden = false;

    http.onreadystatechange = GetGrilla;
    http.open("GET", "http://localhost:3000/personas", true);
    http.send();

    var eventoClick = document.getElementById("tCuerpo");
    eventoClick.addEventListener("dblclick", GetPersona);

    var btnCerrar = document.getElementById("btnCerrar");
    btnCerrar.addEventListener("click", HideHeader);

    var btnEliminar = document.getElementById("btnEliminar");
    btnEliminar.addEventListener("click", Eliminar);

    var btnModificar = document.getElementById("btnModificar");
    btnModificar.addEventListener("click", Modificar);

    var btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.addEventListener("click", Agregar);
}

function GetGrilla() {
    if (http.readyState == 4 && http.status == 200) {
        armarGrilla(JSON.parse(http.responseText));
        HideSpinner();
    }
}

function armarGrilla(jsonObj) {
    tCuerpo = document.getElementById("tCuerpo");

    for (var i = 0; i < jsonObj.length; i++) {
        var row = document.createElement("tr");
        row.setAttribute("idpersonas", jsonObj[i].id); 

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
        var text2 = document.createTextNode(jsonObj[i].apellido);
        cel2.appendChild(text2);
        row.appendChild(cel2);

        var cel3 = document.createElement("td");
        var text3 = document.createTextNode(jsonObj[i].fecha);
        cel3.appendChild(text3);
        row.appendChild(cel3);

        var cel4 = document.createElement("td");
        var text4 = document.createTextNode(jsonObj[i].sexo);
        cel4.appendChild(text4);
        row.appendChild(cel4);

        tCuerpo.appendChild(row);
    }
}

function GetPersona(e) {
    console.log(e.target.parentNode);
    trClick = e.target.parentNode;
    document.getElementById("nombre").value = trClick.childNodes[1].innerHTML;
    document.getElementById("apellido").value = trClick.childNodes[2].innerHTML;
    document.getElementById("fecha").value = trClick.childNodes[3].innerHTML;

    rowGlobal = trClick;
    if (trClick.childNodes[4].innerHTML == "Femenino") {
        document.getElementById("femenino").checked = true;
    } else {
        document.getElementById("masculino").checked = true;
    }
    ShowHeader();
}

function Eliminar(e) {
    ShowSpinner();
    HideHeader();
    
    httpPost.onreadystatechange = function () {
        if (httpPost.readyState == 4 && http.status == 200) {
            rowGlobal.remove();
            HideSpinner();
        }
    }
    httpPost.open("POST", "http://localhost:3000/eliminar", true);
    httpPost.setRequestHeader("Content-Type", "application/json");
    
    var json = { "id": rowGlobal.getAttribute("idpersonas") };
    httpPost.send(JSON.stringify(json));
}

function Agregar(e) {
    var httpPost = new XMLHttpRequest();
    var data = Persona_GetElementsById();
    
    if (CheckFecha(data[2])) {
        if (CheckName(data[0]) && CheckSexo(data[3], data[4])) {
            if(CheckSurname(data[1])) {
                if(confirm("Desea efectuar los cambios?")) {
                    ShowSpinner();
                    HideHeader();
                    
                    httpPost.onreadystatechange = function () {
                        if (httpPost.readyState == 4 && http.status == 200) {
                            HideSpinner();
                        }
                    }
                    httpPost.open("POST", "http://localhost:3000/nueva", true);
                    httpPost.setRequestHeader("Content-Type", "application/json");
                    
                    if (femenino.checked == true) {
                        var json = { 
                            "id": GetNewId(),
                            "nombre": data[0], 
                            "apellido": data[1], 
                            "fecha": data[2], 
                            "sexo": "Femenino" 
                        };
                    } 
                    else if (masculino.checked == true) {
                        var json = { 
                            "id": GetNewId(), 
                            "nombre": data[0], 
                            "apellido": data[1], 
                            "fecha": data[2],
                            "sexo": "Masculino"
                        };
                    }
                    httpPost.send(JSON.stringify(json));
                } 
            }
            else {
                Apellido_ClassError();
                return;
            }
        }
        else {
            Nombre_ClassError();
            return;
        }
    }
     else {
        fecha_ClassError();
        return;
    }
}

function Modificar(e) {
    var httpPost = new XMLHttpRequest();
    var data = Persona_GetElementsById();

    if (CheckFecha(data[2])) {
        if (CheckName(data[0]) && CheckSexo(data[3], data[4])) {
            if(CheckSurname(data[1])) {
                if(confirm("Desea efectuar los cambios?")) {
                    ShowSpinner();
                    HideHeader();
        
                    httpPost.onreadystatechange = function () {
                        if (httpPost.readyState == 4 && http.status == 200) {
                            rowGlobal.childNodes[1].innerHTML = data[0];
                            rowGlobal.childNodes[2].innerHTML = data[1];
                            rowGlobal.childNodes[3].innerHTML = data[2];
        
                            if (femenino.checked == true) {
                             rowGlobal.childNodes[4].innerHTML = "Femenino";
                            } 
                            else if (masculino.checked == true) {
                                rowGlobal.childNodes[4].innerHTML = "Masculino"
                            }
                            HideSpinner();
                        }
                    }
                    httpPost.open("POST", "http://localhost:3000/editar", true);
                    httpPost.setRequestHeader("Content-Type", "application/json");
        
                    if (femenino.checked == true) {
                        var json = { 
                            "id": rowGlobal.getAttribute("idpersonas"),
                            "nombre": data[0], 
                            "apellido": data[1], 
                            "fecha": data[2], 
                            "sexo": "Femenino" 
                        };
                    } 
                    else if (masculino.checked == true) {
                        var json = { 
                            "id": rowGlobal.getAttribute("idpersonas"), 
                            "nombre": data[0], 
                            "apellido": data[1], 
                            "fecha": data[2],
                            "sexo": "Masculino"
                        };
                    }
                    httpPost.send(JSON.stringify(json));
                } 
            } 
            else {
                Apellido_ClassError();
                return;
            }
        }
        else {
            Nombre_ClassError();
            return;
        } 
    }
    else {
        fecha_ClassError();
        return;
    }
}
    
function Persona_GetElementsById(){
    var array = new Array();

    array[0] = document.getElementById("nombre").value;
    array[1] = document.getElementById("apellido").value;
    array[2] = document.getElementById("fecha").value;
    array[3] = document.getElementById("femenino");
    array[4] = document.getElementById("masculino");

    return array;
}

function HideSpinner(){
    document.getElementById("spinner").hidden = true;
}

function ShowSpinner(){
    document.getElementById("spinner").hidden = false;
}

function HideHeader(){
    document.getElementById("contenedor").hidden = true;
}

function ShowHeader(){
    document.getElementById("contenedor").hidden = false;
}

function obtenerFecha(fecha) {
    let data = new Date();
    var arrayfecha = fecha.split("-");

    data.setFullYear(arrayfecha[0]);
    data.setMonth(arrayfecha[1] - 1);
    data.setDate(arrayfecha[2]);

    return data;
}

function CheckFecha(fecha) {
    return obtenerFecha(fecha) < Date.now();
}

function CheckName(nombre) {
    return nombre.length > 3;
}

function CheckSurname(apellido) {
    return apellido.length > 3;
}

function SetFormatDate(fecha){
    var arrayfecha = fecha.split("-");
    return arrayfecha[2] + "/" + arrayfecha[1] + "/" + arrayfecha[0];
}

function CheckSexo(masculino, femenino) {
    return masculino.checked == true || femenino.checked == true;
}

function GetNewId() {
    if (http.readyState == 4 && http.status == 200) {
        jsonObj = JSON.parse(http.responseText);
        return "" + jsonObj.length - 1;
    }
}

function Nombre_ClassError(){
    document.getElementById("nombre").className = "classError";
    alert("Nombre debe tener mas de 3 caracteres");
}

function Apellido_ClassError(){
    document.getElementById("apellido").className = "classError";
    alert("Apellido debe tener mas de 3 caracteres");
}

function fecha_ClassError(){
    document.getElementById("fecha").className = "classError";
    alert("La fecha debe ser menor al dia de hoy");
}