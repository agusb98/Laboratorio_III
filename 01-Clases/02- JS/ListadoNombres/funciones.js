//Avisa cuando terminó de cargar la Página y luego utiliza la funcion Cargar
window.addEventListener("load", Cargar);

function Cargar()
{
    var btnOpen = document.getElementById("btnAbrir");
    btnOpen.addEventListener("click", ClickAbrir);

    var btnSave = document.getElementById("btnGuardar");
    btnSave.addEventListener("click", ClickGuardar);

    var btnSave = document.getElementById("btnCancelar");
    btnSave.addEventListener("click", ClickCancelar);

}
