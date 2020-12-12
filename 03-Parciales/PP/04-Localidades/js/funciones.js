var http = new XMLHttpRequest;
var httpLocalidad = new XMLHttpRequest;
var trClick;
var rowGlobal;

window.onload = function () {
    document.getElementById("spinner").hidden = false;

    http.onreadystatechange = GetGrilla;
    http.open("GET", "http://localhost:3000/personas", true);
    http.send();

    var eventoClick = document.getElementById("tCuerpo");
    eventoClick.addEventListener("click", GetPersona);

    var btnCerrar = document.getElementById("btnCerrar");
    btnCerrar.addEventListener("click", HideHeader);

    var btnModificar = document.getElementById("btnModificar");
    btnModificar.addEventListener("click", Modificar);

    httpLocalidad.open("GET", "http://localhost:3000/localidades", true);
    httpLocalidad.send();
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
        var text3 = document.createTextNode(jsonObj[i].localidad.nombre);
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
    trClick = e.target.parentNode;
    document.getElementById("textNombre").value = trClick.childNodes[1].innerHTML;
    document.getElementById("textApellido").value = trClick.childNodes[2].innerHTML;
    
    rowGlobal = trClick;
    if (trClick.childNodes[4].innerHTML == "Femenino") {
        document.getElementById("femenino").checked = true;
    } else {
        document.getElementById("masculino").checked = true;
    }
    
    var data = JSON.parse(httpLocalidad.responseText);
    var select = document.getElementById("selectLocalidad");
    for(var i=0; i<data.length; i++){
        const option = document.createElement('option');
        const valor = data[i].nombre;
        option.value = valor;
        option.text = valor;
        select.appendChild(option);
    }
    document.getElementById("selectLocalidad").value = trClick.childNodes[3].innerHTML;
    ShowHeader();
}

function Modificar(e) {
    var httpPost = new XMLHttpRequest();
    var data = Persona_GetElementsById();

    if (CheckLocalidad(data[2])) {
        if (CheckName(data[0])){
            if(CheckSurname(data[1])) {
                if(confirm("Desea efectuar los cambios?")) {
                    ShowSpinner();
                    HideHeader();
        
                    httpPost.onreadystatechange = function () {
                        if (httpPost.readyState == 4 && http.status == 200) {
                            rowGlobal.childNodes[1].innerHTML = data[0];
                            rowGlobal.childNodes[2].innerHTML = data[1];
                            rowGlobal.childNodes[3].innerHTML = data[2];
        
                            if (data[3].checked) {
                             rowGlobal.childNodes[4].innerHTML = "Femenino";
                            } 
                            else{ rowGlobal.childNodes[4].innerHTML = "Masculino" }
                            
                            HideSpinner();
                        }
                    }
                    httpPost.open("POST", "http://localhost:3000/editar", true);
                    httpPost.setRequestHeader("Content-Type", "application/json");

                    var localidadArray = JSON.parse(httpLocalidad.responseText);
                    var auxiliar;

                    for(var i = 0; i < data.length; i++){
                        if(data[2] == localidadArray[i].nombre){
                            auxiliar = localidadArray[i];
                            break;
                        }
                    }
                    
                    if (data[3].checked) {
                        var json = { 
                            "id": rowGlobal.getAttribute("idpersonas"),
                            "nombre": data[0], 
                            "apellido": data[1], 
                            "localidad": auxiliar, 
                            "sexo": "Femenino" 
                        };
                    } 
                    else{
                        var json = { 
                            "id": rowGlobal.getAttribute("idpersonas"), 
                            "nombre": data[0], 
                            "apellido": data[1], 
                            "localidad": auxiliar, 
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
        localidad_ClassError();
        return;
    }
}
    
function Persona_GetElementsById(){
    var array = new Array();

    array[0] = document.getElementById("textNombre").value;
    array[1] = document.getElementById("textApellido").value;
    array[2] = document.getElementById("selectLocalidad").value;
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

function CheckLocalidad(localidad) {
    return localidad.length > 3;
}

function CheckName(nombre) {
    return nombre.length > 3;
}

function CheckSurname(apellido) {
    return apellido.length > 3;
}

function SetFormatDate(localidad){
    var arraylocalidad = localidad.split("-");
    return arraylocalidad[2] + "/" + arraylocalidad[1] + "/" + arraylocalidad[0];
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
    document.getElementById("textNombre").className = "classError";
    alert("Nombre debe tener mas de 3 caracteres");
}

function Apellido_ClassError(){
    document.getElementById("textApellido").className = "classError";
    alert("Apellido debe tener mas de 3 caracteres");
}

function localidad_ClassError(){
    document.getElementById("selectLocalidad").className = "classError";
    alert("Elegir una localidad");
}