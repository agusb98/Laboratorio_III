namespace Vehiculos {
    var arrayList: Array<Vehiculo> = new Array<Vehiculo>();

    window.onload = function () {

        //CONTENEDOR
        document.getElementById("btnAdd")?.addEventListener("click", confirmAdd);
        document.getElementById("btnOpen")?.addEventListener("click", openContainer);
        document.getElementById("btnClose")?.addEventListener("click", closeContainer);
        document.getElementById("btnCancel")?.addEventListener("click", closeContainer);
        document.getElementById("btnClear")?.addEventListener("click", clearContainer);
        document.getElementById("tipo")?.addEventListener("change", tiposExistentes);

        //OCULTA CAMPOS
        document.getElementById("idCheck").addEventListener("change", hideFields);
        document.getElementById("marcaCheck").addEventListener("change", hideFields);
        document.getElementById("modeloCheck").addEventListener("change", hideFields);
        document.getElementById("precioCheck").addEventListener("change", hideFields);

        //FILTRAR
        document.getElementById("filter").addEventListener("change", Filter);

        //PROMEDIO
        document.getElementById("btnProm").addEventListener("click", getProm);
    }
    export function openContainer() {
        clearContainer();
        (<HTMLInputElement>document.getElementById("container")).hidden = false;
    }

    export function clearContainer() {
        (<HTMLInputElement> document.getElementById("marcaText")).value = "";
        (<HTMLInputElement>document.getElementById("modeloText")).value = "";
        (<HTMLInputElement>document.getElementById("precioText")).value = "";
        (<HTMLInputElement>document.getElementById("cantPuertasText")).value = "";
        (<HTMLInputElement>document.getElementById("tipo")).value = "Auto"; 
        (<HTMLInputElement>document.getElementById("Auto")).hidden = false;
        (<HTMLInputElement>document.getElementById("Camioneta")).hidden = true;
    }

    export function closeContainer() {
        (<HTMLInputElement>document.getElementById("container")).hidden = true;
    }

    export function getNewId() {
        var id: number = 1;
        if (arrayList.length != 0) {
            id = arrayList.reduce((a, b) => a > b ? b = a : b).getId() + 1;
        }
        return id;
    }

    export function getValuesOfElements(){
        var array = new Array();
        
        array[0] = ((<HTMLInputElement>document.getElementById("marcaText")).value).toString();
        array[1] = ((<HTMLInputElement>document.getElementById("modeloText")).value).toString();
        array[2] = ((<HTMLInputElement>document.getElementById("precioText")).value).toString();
        array[3]  = ((<HTMLInputElement>document.getElementById("tipo")).value).toString();
        array[4] = ((<HTMLInputElement>document.getElementById("cantPuertasText")).value).toString();

        return array;
    }

    export function confirmAdd(){
        if(confirm("Confirm?")) { Add();}
    }

    export function Add() {
        var data = getValuesOfElements();
        var esCuatroXcuatro: boolean = (<HTMLInputElement>document.getElementById("4x4Check")).checked;

        if(checkValues(data[0], data[1], parseInt(data[2]), parseInt(data[4]))){
            if(data[3] == "Auto"){
                var obj = new Vehiculos.Auto(getNewId(), data[0], data[1], parseInt(data[2]), parseInt(data[4]))
                arrayList.push(<Vehiculo>obj);
                var table = (<HTMLTableElement>document.getElementById("table"));
                createRow(table, <Vehiculo>obj);
            }
            else if(data[3] == "Camioneta"){
                var obj = new Vehiculos.Camioneta(getNewId(), data[0], data[1], parseInt(data[2]), esCuatroXcuatro);
                arrayList.push(<Vehiculo>obj);
                var table = (<HTMLTableElement>document.getElementById("table"));
                createRow(table, <Vehiculo>obj);
            }
            closeContainer();
        }
    }

    export function createRow(table: HTMLTableElement, obj: Vehiculo): void {
        var tbody = table;
        var tr = document.createElement("tr");
        
        var td0 = document.createElement("td");
        td0.setAttribute("name","idTh");
        var nodotext0 = document.createTextNode(obj.getId().toString());
        td0.appendChild(nodotext0);
        tr.appendChild(td0);
    
        var td1 = document.createElement("td");
        td1.setAttribute("name","marcaTh");
        var nodotext1 = document.createTextNode(obj.getMarca());
        td1.appendChild(nodotext1);
        tr.appendChild(td1);
    
        var td2 = document.createElement("td");
        td2.setAttribute("name","modeloTh");
        var nodotext2 = document.createTextNode(obj.getModelo());
        td2.appendChild(nodotext2);
        tr.appendChild(td2);
    
        var td3 = document.createElement("td");
        td3.setAttribute("name","precioTh");
        var nodotext3 = document.createTextNode(obj.getPrecio().toString()); 
        td3.appendChild(nodotext3);
        tr.appendChild(td3);
        
        var td4 = document.createElement("td");
        var btnDelete = document.createElement("button");
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute('id', 'btnDelete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener("click", confirmDelete);

        td4.appendChild(btnDelete);
        tr.appendChild(td4);
        tbody.appendChild(tr);  
    }

    export function confirmDelete(tr: any){
        if(confirm("Confirm?")) {
            Delete(tr);
        }
    }

    export function Delete(tr: any) {
        var trToDelete = tr.target.parentNode.parentNode;
        var idToDelete = trToDelete.childNodes[0].innerHTML;
        var table = (<HTMLTableElement>document.getElementById("table"));
        var list = arrayList.filter(obj => obj.getId() == idToDelete);
    
        if (list.length > 0) {
            arrayList.splice(idToDelete, 1);
            removeChildNode(table, trToDelete, idToDelete);
        }
    }

    export function removeChildNode(table: HTMLTableElement, tr: any, id: string){
        table.childNodes.forEach(element => {
            if (element.nodeName == "TR") {
                if (element.childNodes[2].textContent == id) {
                    element.remove();
                }
            }
            tr.remove();
        });
    }

    export function hideFields() {
        var id = <HTMLInputElement>document.getElementById("idCheck");
        var marca = <HTMLInputElement>document.getElementById("marcaCheck");
        var modelo = <HTMLInputElement>document.getElementById("modeloCheck");
        var precio = <HTMLInputElement>document.getElementById("precioCheck");

        if (id.checked){
            var var0 = document.getElementsByName("idTh");
            var0.forEach(x => { x.hidden = false; })
        } else {
            var var0 = document.getElementsByName("idTh");
            var0.forEach(x => { x.hidden = true; })        
        }

        if (marca.checked) {
            var var1 = document.getElementsByName("marcaTh");
            var1.forEach(x => { x.hidden = false; })
        } else {
            var var1 = document.getElementsByName("marcaTh");
            var1.forEach(x => { x.hidden = true; })
        }

        if (modelo.checked) {
            var var2 = document.getElementsByName("modeloTh");
            var2.forEach(x => { x.hidden = false; })
        } else {
            var var2 = document.getElementsByName("modeloTh");
            var2.forEach(x => { x.hidden = true; })
        }
        
        if (precio.checked) {
            var var3 = document.getElementsByName("precioTh");
            var3.forEach(x => { x.hidden = false; })
        } else {
            var var3 = document.getElementsByName("precioTh");
            var3.forEach(x => { x.hidden = true; })
        }
    }

    export function tiposExistentes() {
        var tipo = (<HTMLInputElement>document.getElementById("tipo")).value;
        if (tipo == "Auto") {
            (<HTMLInputElement>document.getElementById("Auto")).hidden = false;
            (<HTMLInputElement>document.getElementById("Camioneta")).hidden = true;
        }
        else if (tipo == "Camioneta") {
            (<HTMLInputElement>document.getElementById("Camioneta")).hidden = false;
            (<HTMLInputElement>document.getElementById("Auto")).hidden = true;
        }
    }

    export function promPromesa() {
        return new Promise((resolve, reject)=>{
            let sum:number = arrayList.reduce(function(a, b){ 
            return a += b.getPrecio()},0);
            resolve(sum);              
          });        
    }

    export function getProm() {
        promPromesa().then(function(response){
            (<HTMLInputElement>document.getElementById("promText")).value
             = (<number>response/arrayList.length).toString();
        });
    }

    export function filterPromise() {
        var filter = (<HTMLSelectElement>document.getElementById("filter")).value;
        return new Promise((resolve, reject)=>{

            if(filter == "Todos"){
                 reject(arrayList);
             }
             else if(filter == "Auto"){
                 var listaFiltrada = arrayList.filter(obj => obj.constructor.name == filter);
                 resolve(listaFiltrada);
             }   
             else if(filter == "Camioneta"){
                var listaFiltrada = arrayList.filter(obj => obj.constructor.name == filter);
                resolve(listaFiltrada);
            }             
        });   
    }

    export function Filter(){  
        var cabeceras = ["Id", "Marca", "Modelo", "Precio", "Accion"];  
        (<HTMLTableElement> document.getElementById("table")).hidden = true;
        var filterTable = (<HTMLTableElement> document.getElementById("filterTable"));

        filterTable.hidden = false;
            filterPromise().then(function(response){
            filterTable.innerHTML="";
            var thead = document.createElement("thead");
            filterTable.appendChild(thead);

            for(var i = 0; i < cabeceras.length; i++){
                thead.appendChild(document.createElement("th")).
                appendChild(document.createTextNode(cabeceras[i]));
            }
            var arrayList = <Array<Vehiculo>>response;
            for(var i = 0; i < arrayList.length; i++ ) {
                createRow(filterTable, arrayList[i]);
            }  
            filterTable.hidden=false;  

        }).catch(function(reject){
            filterTable.hidden=true;
            (<HTMLTableElement> document.getElementById("table")).hidden = false;
        });
    }

    /*/////////////////////////////////////////////////////////////////////////////
                                    VALIDACIONES
    /////////////////////////////////////////////////////////////////////////////*/

    export function checkValues(var1: string, var2: string, var3: number, var4: number){
        if(!isString(var1, 3)){
            document.getElementById("marcaText").className="classError";
            return false;
        }
        else if(!isString(var2, 3)){
            document.getElementById("modeloText").className="classError";
            return false;
        }
        else if(!isNumber(var3, 0)){
            document.getElementById("precioText").className="classError";
            return false;
        }
        else if(!isNumber(var4, 0)){
            document.getElementById("cantPuertasText").className="classError";
            return false;
        }
        else{
            document.getElementById("marcaText").className="classOk";
            document.getElementById("modeloText").className="classOk";
            document.getElementById("precioText").className="classOk";
            document.getElementById("cantPuertasText").className="classOk";
            return true;
        }
    }
    
    export function isString(str: string, min: number){
        if(str == "" || str.length < min){
            alert("Ingrese minimo " + min + " caracteres");
            return false;
        }
        return true;
    }

    export function isNumber(num: number, min: number){

        if((<HTMLInputElement>document.getElementById("tipo")).value == "Camioneta"){
            return true;
        }
        if(num < min || !num){
            alert("Ingrese numeros mayores a " + min);
            return false;
        }
        return true;
    }
}