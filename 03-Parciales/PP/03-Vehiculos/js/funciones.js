var http = new XMLHttpRequest();
var jsonList= new Array();
var objToSave;

var urlAutos = 'http://localhost:3000/autos';
var urlGuardar = 'http://localhost:3000/nuevoAuto';
var urlEditar = 'http://localhost:3000/editarYear';

var objId;
var idEditar;

var rta;
var auxYear;
var flag = false;
var selectedOption;

window.addEventListener("load", Load);

function Load() {
    Buttons();
    peticionGet(urlAutos, getTable);
}

function Buttons()
{
    var btnOpen = document.getElementById("btnOpen");
    btnClose.addEventListener("mouseout",function() {
    btnClose.value = "X";
    });
    btnClose.addEventListener("mouseover",function() {
        btnClose.value = "Bye";
    });
    
    btnSave.addEventListener("mouseout",function(){
        btnSave.value = "Edit";
    });
    btnSave.addEventListener("mouseover",function(){
        btnSave.value = "Ready?";
    });
    btnOpen.addEventListener("click", showContainer);

    var select = document.getElementById("slcAño");
    addYears(select);
}

function peticionGet(url, funcion) {
    http.onreadystatechange = funcion;
    http.open("GET", url, true);
    http.send();
}

function getTable() {
    table = document.getElementById("tableCars");
    if(http.readyState == 4) {
        if(http.status == 200) {
            var json = JSON.parse(http.responseText);

            console.log("cantidad de elementos: " + json.length);
            
            for(var i = 0; i < json.length; i++) {
                var trList = new Array();
                var auto = new Array(json[i].make,json[i].model, json[i].year,json[i].id);
                var trObj = newNode(auto);
                            
                table.appendChild(trObj);

                var element = document.getElementsByTagName("tr");
                for(var j = 0; j < element.length; j++) {
                    trList.push(element[i]);
                }
                jsonList.push(json[i]);
            }
        }
        else { alert("ERROR"); }
    }
}

function newNode(obj) {
    var trObj = document.createElement("tr");
        
    var tdId = document.createElement("td");
    var tdMarca = document.createElement("td");
    var tdModelo = document.createElement("td");
    var tdAño = document.createElement("select");

    addYearsRows(tdAño, obj[2]);
  
    tdAño.addEventListener("change",function(){
        selectedOption = this.options[tdAño.selectedIndex];
    });

    tdAño.addEventListener("change", editYear);
    tdId.hidden = true;
    
    var txMarca = document.createTextNode(obj[0]);
    var txModelo = document.createTextNode(obj[1]);
    var txAño = document.createTextNode(obj[2]);
    var txId = document.createTextNode(obj[3]);
  
    tdMarca.appendChild(txMarca);
    tdModelo.appendChild(txModelo);
    tdAño.appendChild(txAño);
    tdId.appendChild(txId);
  
    trObj.appendChild(tdMarca);
    trObj.appendChild(tdModelo);
    trObj.appendChild(tdAño);
    trObj.appendChild(tdId);
    
    return trObj;
}

function showContainer(){
    var container = document.getElementById("divContainer");
    container.hidden = false;
    
    setElementValues("", "", false);
    if(flag == false){
        container.hidden = flag;
        flag = true;
        btnOpen.value = "Close"
    }
    else{
        container.hidden = flag;
        flag = false;
        btnOpen.value = "Open"
    }
    var btnClose = document.getElementById("btnClose");
    btnClose.addEventListener("click", hidecontainer);
    
    var btnSave = document.getElementById("btnSave");    
    btnSave.addEventListener("click", Add);
}

function hidecontainer(){
    var container = document.getElementById("divContainer");
    btnOpen.value = "Open"
    container.hidden = true;
    flag = false;
}

function setElementValues(make, model, year){
    document.getElementById("txtMarca").value = make;
    document.getElementById("txtModelo").value = model;
    document.getElementById("slcAño").disabled = year;
}

function getElementValues(){
    var array = new Array();

    array[0] = document.getElementById("txtMarca");
    array[1] = document.getElementById("txtModelo");
    array[2] = document.getElementById("slcAño").value;

    return array;
}

function Add(){
    var dataArray = getElementValues();
    if(checkValues(dataArray[0], dataArray[1], dataArray[2]) == true){
        var objToSave = new Array(dataArray[0].value, dataArray[1].value, dataArray[2]);
        createObject(objToSave);
        hidecontainer();
    }
}

function checkValues(marca, modelo, año){
    var status = true;
    if(marca.value.length < 3){
        marca.className = "inputError";
        status = false;
    }
    else {marca.className = "inputSinError";}

    if(modelo.value.length < 3){
        modelo.className = "inputError";
        status = false;
    }
    else {modelo.className = "inputSinError";}

    var flagYear = (new Date()).getFullYear();
    if(año.value < flagYear - 20 || año.value > flagYear){
        año.className = "inputError";
        status = false;
    }
    else {año.className = "inputSinError";}
    return status;
}

function createRow(obj){
    console.log("Nuevo elemento: " + obj[0]);
    var table = document.getElementById("tableCars");
    var trList = new Array();
    var trObjs = newNode(obj);
    table.appendChild(trObjs);
    
    var element = document.getElementsByTagName("tr");
    for(var j = 0; j < element.length; j++){
        trList.push(element);
    }
}

function createObject(obj){
    var json = {"make":obj[0],"model":obj[1],"year":obj[2]};
    saveByPost(urlGuardar, answerByPost, JSON.stringify(json));
}

function showSpinner(){
    document.getElementById("spinner").hidden = false;
}
function hideSpinner(){
    document.getElementById("spinner").hidden = true;
}

function addYearsRows(select, año){
    var flag  = false
    var flagYear = (new Date()).getFullYear();
    
    for(var i = flagYear - 20; i <= flagYear; i++){
        var option = document.createElement('option');
        
        option.value = i;
        option.text = i;
        
        if(año < flagYear - 20 && flag == false){
            var optionAux = document.createElement('option');
            flag = true;
            optionAux.value = año;
            optionAux.text = año;
            optionAux.selected = true;
            select.appendChild(optionAux);
        }
        if(i == año){ option.selected = true; }
        select.appendChild(option);
    }
}

function addYears(select){
    var flagYear = (new Date()).getFullYear();
    for(var i = flagYear -20 ; i <= flagYear; i++){
        var option = document.createElement('option');
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }
}

function editYear(event){
    var row = event.target.parentNode;
    var id = row.childNodes[3].innerText;

    console.log("ID: " + id);
    var json = {"id":id, "year":selectedOption.text};
    
    saveByPost(urlEditar, answerByPost, JSON.stringify(json));
}

function answerByPost(){
    if(http.readyState == 4){
        if(http.status == 200){
            hideSpinner();
        }
    }
}

function saveByPost(url, funcion, param){
    showSpinner();
    http.onreadystatechange = funcion;
    http.open("POST", url, true);    
    http.setRequestHeader("Content-Type", "application/json");
    http.send(param);
}