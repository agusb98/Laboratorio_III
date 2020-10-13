//Avisa cuando terminó de cargar la Página y luego utiliza la funcion Cargar

window.addEventListener("load", Cargar);
var peticionHttp = new XMLHttpRequest();

function Cargar()
{
    var btnOpen = document.getElementById("btnEnviar");
    btnOpen.addEventListener("click", ejecutarPost);
}

function ejecutarPost()
{
    var usr = GetValue("usr");
    var pass = GetValue("pass");
    alert(usr + "-" + pass);
    
    peticionHttp.onreadystatechange = RespuestaPost;
    peticionHttp.open("POST", "http://localhost:3000/loginUsuario", true);
    peticionHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    peticionHttp.send("&usr=" + usr + "&pass=" + pass);
}

function RespuestaPost(){
    if(peticionHttp.readyState == 4){
        if(peticionHttp.status == 200){
            alert(peticionHttp.responseText);
        }else{
            alert("ERROR");
        }
    }
}

function GetValue(id){
    return document.getElementById(id).value;
}

function ObjToJson(obj){
    return JSON.parse(obj);
}

function ArrayToJson(arrayObj){
    return ObjToJson(arrayObj);
}

function ObjJsonToString(obj){
    return JSON.stringify(obj);
}

function ArrayJsonToString(arrayObj){
    return ObjJsonToString(arrayObj);
}