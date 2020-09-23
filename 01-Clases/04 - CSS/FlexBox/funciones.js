function changeValue(){
    var cont = document.getElementById("contenedor1");
    var select =document.getElementById("selecDirection");
    var selectCont =document.getElementById("selecContent");
    var selecAlign =document.getElementById("selecAlign");
    
    
    cont.className =select.value+" "+selectCont.value+" "+selecAlign.value;
    var div1 = document.getElementById("div1");
    var div2 = document.getElementById("div2");
    var div3 = document.getElementById("div3");
    div1.innerHTML ="Caja 1";
    div2.innerHTML ="Caja 2";
    div3.innerHTML ="Caja 3";
}

function cambiarGrow(e){
    var num =e.target.value;
    var div =e.target.parentNode;
    div.style ="flex-grow: "+num;   //deja espacio libre dependiendo la cantidad de objetos y espacio que haya

}