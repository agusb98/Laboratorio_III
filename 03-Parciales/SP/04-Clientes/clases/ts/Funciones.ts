namespace Personas {
    var arrayList: Array<Persona> = new Array<Persona>();

    window.onload = function () {

        //CONTENEDOR
        document.getElementById("btnAdd")?.addEventListener("click", confirmAdd);
        document.getElementById("btnOpen")?.addEventListener("click", openContainer);
        document.getElementById("btnClose")?.addEventListener("click", closeContainer);
        document.getElementById("btnCancel")?.addEventListener("click", closeContainer);
        document.getElementById("btnClear")?.addEventListener("click", clearContainer);

        //OCULTA CAMPOS
        document.getElementById("checkId").addEventListener("change", showFields);
        document.getElementById("checkNombre").addEventListener("change", showFields);
        document.getElementById("checkApellido").addEventListener("change", showFields);
        document.getElementById("checkEdad").addEventListener("change", showFields);
        document.getElementById("checkSexo").addEventListener("change", showFields);
        
        //FILTRAR
        document.getElementById("selectFilter").addEventListener("change", Filter);

        //PROMEDIO
        document.getElementById("btnProm").addEventListener("click", getPromEdad);

        //ELIMINAR TODO
        document.getElementById("btnClearAll")?.addEventListener("click", deleteAll);
    }
    export function openContainer() {
        (<HTMLInputElement>document.getElementById("container")).hidden = false;
    }

    export function clearContainer() {
        (<HTMLInputElement> document.getElementById("textNombre")).value = "";
        (<HTMLInputElement>document.getElementById("textApellido")).value = "";
        (<HTMLInputElement>document.getElementById("textEdad")).value = "";
        (<HTMLInputElement>document.getElementById("selectSexo")).value = "Masculino"; 
    }

    export function closeContainer() {
        clearContainer();
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
        
        array[0] = ((<HTMLInputElement>document.getElementById("textNombre")).value).toString();
        array[1] = ((<HTMLInputElement>document.getElementById("textApellido")).value).toString();
        array[2] = ((<HTMLInputElement>document.getElementById("textEdad")).value).toString();
        array[3]  = ((<HTMLInputElement>document.getElementById("selectSexo")).value).toString();

        return array;
    }

    export function Add() {
        var data = getValuesOfElements();
        if(checkValues(data[0], data[1], parseInt(data[2]))){

            var obj = new Personas.Cliente(getNewId(), data[0], data[1], parseInt(data[2]), data[3])
            arrayList.push(<Persona>obj);
            var table = (<HTMLTableElement>document.getElementById("table"));
            createRow(table, obj);
            closeContainer();
        }
    }

    export function createRow(table: HTMLTableElement, obj: Cliente): void {
        var tbody = table;
        var tr = document.createElement("tr");
        
        var td0 = document.createElement("td");
        td0.setAttribute("name", "thId");
        var nodotext0 = document.createTextNode(obj.getId().toString());
        td0.appendChild(nodotext0);
        tr.appendChild(td0);
    
        var td1 = document.createElement("td");
        td1.setAttribute("name", "thNombre");
        var nodotext1 = document.createTextNode(obj.getNombre());
        td1.appendChild(nodotext1);
        tr.appendChild(td1);
    
        var td2 = document.createElement("td");
        td2.setAttribute("name", "thApellido");
        var nodotext2 = document.createTextNode(obj.getApellido());
        td2.appendChild(nodotext2);
        tr.appendChild(td2);
    
        var td3 = document.createElement("td");
        td3.setAttribute("name", "thEdad");
        var nodotext3 = document.createTextNode(obj.getEdad().toString()); 
        td3.appendChild(nodotext3);
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        td4.setAttribute("name", "thSexo");
        var nodotext3 = document.createTextNode(obj.getSexo().toString()); 
        td4.appendChild(nodotext3);
        tr.appendChild(td4);
    
        var td5 = document.createElement("td");
        var btnDelete = document.createElement("button");
        btnDelete.setAttribute("type", "button");
        btnDelete.setAttribute('id', 'btnDelete');
        btnDelete.textContent = "Delete";
        btnDelete.addEventListener("click", confirmDelete);

        td5.appendChild(btnDelete);
        tr.appendChild(td5);
        tbody.appendChild(tr); 
    }

    export function showFields() {
        var id = <HTMLInputElement>document.getElementById("checkId");
        var nombre = <HTMLInputElement>document.getElementById("checkNombre");
        var apellido = <HTMLInputElement>document.getElementById("checkApellido");
        var edad = <HTMLInputElement>document.getElementById("checkEdad");
        var sexo = <HTMLInputElement>document.getElementById("checkSexo");

        if (id.checked){
            var var0 = document.getElementsByName("thId");
            var0.forEach(x => { x.hidden = false; })
        } else {
            var var0 = document.getElementsByName("thId");
            var0.forEach(x => { x.hidden = true; })        
        }

        if (nombre.checked) {
            var var1 = document.getElementsByName("thNombre");
            var1.forEach(x => { x.hidden = false; })
        } else {
            var var1 = document.getElementsByName("thNombre");
            var1.forEach(x => { x.hidden = true; })
        }

        if (apellido.checked) {
            var var2 = document.getElementsByName("thApellido");
            var2.forEach(x => { x.hidden = false; })
        } else {
            var var2 = document.getElementsByName("thApellido");
            var2.forEach(x => { x.hidden = true; })
        }
        
        if (edad.checked) {
            var var3 = document.getElementsByName("thEdad");
            var3.forEach(x => { x.hidden = false; })
        } else {
            var var3 = document.getElementsByName("thEdad");
            var3.forEach(x => { x.hidden = true; })
        }

        if (sexo.checked) {
            var var4 = document.getElementsByName("thSexo");
            var4.forEach(x => { x.hidden = false; })
        } else {
            var var4 = document.getElementsByName("thSexo");
            var4.forEach(x => { x.hidden = true; })
        }
    }

    export function confirmDelete(tr: any){
        if(confirm("Confirm?")) {
            Delete(tr);
        }
    }

    export function confirmAdd(){
        if(confirm("Confirm?")) { Add(); }
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

    export function deleteAll(){
        if(confirm("Confirm?")) {
            arrayList = new Array();
            var table = <HTMLTableElement>document.getElementById("table");
            table.innerHTML = "";
            table.hidden = false;

            var headers = ["Id", "Nombre", "Apellido", "Edad", "Sexo", "Accion"]; 
            var thead = document.createElement("thead");
            table.appendChild(thead);
    
            for(var i = 0; i < headers.length; i++){
                thead.appendChild(document.createElement("th")).
                appendChild(document.createTextNode(headers[i]));
            }
        }
    }

    export function getAcumEdad() {
        return new Promise((resolve)=>{
            let sum:number = arrayList.reduce(function(a, b){ 
                return a += b.getEdad()
            }, 0);
            resolve(sum);              
        });        
    }

    export function getPromEdad() {
        getAcumEdad().then(function(response){
            (<HTMLInputElement>document.getElementById("textProm")).value
             = (<number>response/arrayList.length).toString();
        });
    }
    
    export function searchBySexo(list: any, value: string){
        return new Promise((resolve)=>{
            var newList = list.filter(obj => <Cliente>obj.getSexo() == value);
            resolve(newList);
        });
    }

    export function Search(value?: string) {
        var list = (<HTMLSelectElement>document.getElementById("selectFilter")).value;
        return new Promise((resolve, reject)=>{

            if(list == "Todos") {reject(arrayList); }
            else {resolve(searchBySexo(arrayList, list)); }  
        });   
    }

    export function createTable(table: HTMLTableElement, list: array){
        (<HTMLTableElement> document.getElementById("table")).hidden = true;
        var headers = ["Id", "Nombre", "Apellido", "Edad", "Sexo", "Accion"]; 

        table.hidden = false;
        table.innerHTML = "";
        var thead = document.createElement("thead");
        table.appendChild(thead);

        for(var i = 0; i < headers.length; i++){
            thead.appendChild(document.createElement("th")).
            appendChild(document.createTextNode(headers[i]));
        }

        for(var i = 0; i < list.length; i++ ) {
            createRow(table, <Cliente>list[i]);
        }  
        table.hidden = false;  
    }

    export function Filter(){  
        (<HTMLTableElement> document.getElementById("table")).hidden = true;
        var filterTable = (<HTMLTableElement> document.getElementById("filterTable"));

        filterTable.hidden = false;
            Search().then(function(response){
                createTable(filterTable, response);
            }).catch(function(reject){
            filterTable.hidden = true;
            (<HTMLTableElement> document.getElementById("table")).hidden = false;
        });
    }

    /*//////////////////////////////////////////////////////////////////////////////
                                    VALIDACIONES
    //////////////////////////////////////////////////////////////////////////////*/

    export function checkValues(var1: string, var2: string, var3: number){
        if(!isString(var1, 3)) {
            document.getElementById("textNombre").className="classError";
            return false;
        }
        else if(!isString(var2, 3)){
            document.getElementById("textApellido").className="classError";
            return false;
        }
        else if(!isNumber(var3, 0)){
            document.getElementById("textEdad").className="classError";
            return false;
        }
        else{
            document.getElementById("textNombre").className="classOk";
            document.getElementById("textApellido").className="classOk";
            document.getElementById("textEdad").className="classOk";
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
        if(num < min || !num){
            alert("Ingrese numeros mayores a " + min);
            return false;
        }
        return true;
    }
}