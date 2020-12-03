var Personas;
(function (Personas) {
    var arrayList = new Array();
    window.onload = function () {
        var _a, _b, _c, _d, _e;
        //CONTENEDOR
        (_a = document.getElementById("btnAdd")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", confirmAdd);
        (_b = document.getElementById("btnOpen")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", openContainer);
        (_c = document.getElementById("btnClose")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", closeContainer);
        (_d = document.getElementById("btnCancel")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", closeContainer);
        (_e = document.getElementById("btnClear")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", clearContainer);
        //OCULTA CAMPOS
        document.getElementById("checkLegajo").addEventListener("change", showFields);
        document.getElementById("checkNombre").addEventListener("change", showFields);
        document.getElementById("checkApellido").addEventListener("change", showFields);
        document.getElementById("checkEdad").addEventListener("change", showFields);
        document.getElementById("checkTurno").addEventListener("change", showFields);
        //FILTRAR
        document.getElementById("selectFilter").addEventListener("change", Filter);
        //PROMEDIO
        document.getElementById("btnProm").addEventListener("click", getPromEdad);
    };
    function openContainer() {
        document.getElementById("container").hidden = false;
    }
    Personas.openContainer = openContainer;
    function clearContainer() {
        document.getElementById("textNombre").value = "";
        document.getElementById("textApellido").value = "";
        document.getElementById("textEdad").value = "";
        document.getElementById("selectTurno").value = "Mañana";
    }
    Personas.clearContainer = clearContainer;
    function closeContainer() {
        clearContainer();
        document.getElementById("container").hidden = true;
    }
    Personas.closeContainer = closeContainer;
    function getNewId() {
        var id = 1;
        if (arrayList.length != 0) {
            id = arrayList.reduce(function (a, b) { return a > b ? b = a : b; }).getLegajo() + 1;
        }
        return id;
    }
    Personas.getNewId = getNewId;
    function getValuesOfElements() {
        var array = new Array();
        array[0] = (document.getElementById("textNombre").value).toString();
        array[1] = (document.getElementById("textApellido").value).toString();
        array[2] = (document.getElementById("textEdad").value).toString();
        array[3] = (document.getElementById("selectTurno").value).toString();
        return array;
    }
    Personas.getValuesOfElements = getValuesOfElements;
    function Add() {
        var data = getValuesOfElements();
        if (checkValues(data[0], data[1], parseInt(data[2]))) {
            var obj = new Personas.Empleado(getNewId(), data[0], data[1], parseInt(data[2]), data[3]);
            arrayList.push(obj);
            var table = document.getElementById("table");
            createRow(table, obj);
            closeContainer();
        }
    }
    Personas.Add = Add;
    function createRow(table, obj) {
        var tbody = table;
        var tr = document.createElement("tr");
        var td0 = document.createElement("td");
        td0.setAttribute("name", "thLegajo");
        var nodotext0 = document.createTextNode(obj.getLegajo().toString());
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
        td4.setAttribute("name", "thTurno");
        var nodotext3 = document.createTextNode(obj.getTurno().toString());
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
    Personas.createRow = createRow;
    function showFields() {
        var legajo = document.getElementById("checkLegajo");
        var nombre = document.getElementById("checkNombre");
        var apellido = document.getElementById("checkApellido");
        var edad = document.getElementById("checkEdad");
        var turno = document.getElementById("checkTurno");
        if (legajo.checked) {
            var var0 = document.getElementsByName("thLegajo");
            var0.forEach(function (x) { x.hidden = false; });
        }
        else {
            var var0 = document.getElementsByName("thLegajo");
            var0.forEach(function (x) { x.hidden = true; });
        }
        if (nombre.checked) {
            var var1 = document.getElementsByName("thNombre");
            var1.forEach(function (x) { x.hidden = false; });
        }
        else {
            var var1 = document.getElementsByName("thNombre");
            var1.forEach(function (x) { x.hidden = true; });
        }
        if (apellido.checked) {
            var var2 = document.getElementsByName("thApellido");
            var2.forEach(function (x) { x.hidden = false; });
        }
        else {
            var var2 = document.getElementsByName("thApellido");
            var2.forEach(function (x) { x.hidden = true; });
        }
        if (edad.checked) {
            var var3 = document.getElementsByName("thEdad");
            var3.forEach(function (x) { x.hidden = false; });
        }
        else {
            var var3 = document.getElementsByName("thEdad");
            var3.forEach(function (x) { x.hidden = true; });
        }
        if (turno.checked) {
            var var4 = document.getElementsByName("thTurno");
            var4.forEach(function (x) { x.hidden = false; });
        }
        else {
            var var4 = document.getElementsByName("thTurno");
            var4.forEach(function (x) { x.hidden = true; });
        }
    }
    Personas.showFields = showFields;
    function confirmDelete(tr) {
        if (confirm("Confirm?")) {
            Delete(tr);
        }
    }
    Personas.confirmDelete = confirmDelete;
    function confirmAdd() {
        if (confirm("Confirm?")) {
            Add();
        }
    }
    Personas.confirmAdd = confirmAdd;
    function Delete(tr) {
        var trToDelete = tr.target.parentNode.parentNode;
        var idToDelete = trToDelete.childNodes[0].innerHTML;
        var table = document.getElementById("table");
        var list = arrayList.filter(function (obj) { return obj.getLegajo() == idToDelete; });
        if (list.length > 0) {
            arrayList.splice(idToDelete, 1);
            removeChildNode(table, trToDelete, idToDelete);
        }
    }
    Personas.Delete = Delete;
    function removeChildNode(table, tr, id) {
        table.childNodes.forEach(function (element) {
            if (element.nodeName == "TR") {
                if (element.childNodes[2].textContent == id) {
                    element.remove();
                }
            }
            tr.remove();
        });
    }
    Personas.removeChildNode = removeChildNode;
    function getAcumEdad() {
        return new Promise(function (resolve) {
            var sum = arrayList.reduce(function (a, b) {
                return a += b.getEdad();
            }, 0);
            resolve(sum);
        });
    }
    Personas.getAcumEdad = getAcumEdad;
    function getPromEdad() {
        getAcumEdad().then(function (response) {
            document.getElementById("textProm").value
                = (response / arrayList.length).toString();
        });
    }
    Personas.getPromEdad = getPromEdad;
    function searchByTurno(list, value) {
        return new Promise(function (resolve) {
            var newList = list.filter(function (obj) { return obj.getTurno() == value; });
            resolve(newList);
        });
    }
    Personas.searchByTurno = searchByTurno;
    function Search(value) {
        var list = document.getElementById("selectFilter").value;
        return new Promise(function (resolve, reject) {
            if (list == "Todos") {
                reject(arrayList);
            }
            else {
                resolve(searchByTurno(arrayList, list));
            }
        });
    }
    Personas.Search = Search;
    function createTable(table, list) {
        document.getElementById("table").hidden = true;
        var headers = ["Id", "Nombre", "Apellido", "Edad", "Turno", "Accion"];
        table.hidden = false;
        table.innerHTML = "";
        var thead = document.createElement("thead");
        table.appendChild(thead);
        for (var i = 0; i < headers.length; i++) {
            thead.appendChild(document.createElement("th")).
                appendChild(document.createTextNode(headers[i]));
        }
        for (var i = 0; i < list.length; i++) {
            createRow(table, list[i]);
        }
        table.hidden = false;
    }
    Personas.createTable = createTable;
    function Filter() {
        document.getElementById("table").hidden = true;
        var filterTable = document.getElementById("filterTable");
        filterTable.hidden = false;
        Search().then(function (response) {
            createTable(filterTable, response);
        })["catch"](function (reject) {
            filterTable.hidden = true;
            document.getElementById("table").hidden = false;
        });
    }
    Personas.Filter = Filter;
    /*//////////////////////////////////////////////////////////////////////////////
                                    VALIDACIONES
    //////////////////////////////////////////////////////////////////////////////*/
    function checkValues(var1, var2, var3) {
        if (!isString(var1, 0)) {
            document.getElementById("textNombre").className = "classError";
            return false;
        }
        else if (!isString(var2, 0)) {
            document.getElementById("textApellido").className = "classError";
            return false;
        }
        else if (!isNumber(var3, 0)) {
            document.getElementById("textEdad").className = "classError";
            return false;
        }
        else {
            document.getElementById("textNombre").className = "classOk";
            document.getElementById("textApellido").className = "classOk";
            document.getElementById("textEdad").className = "classOk";
            return true;
        }
    }
    Personas.checkValues = checkValues;
    function isString(str, min) {
        if (str == "" || str.length < min) {
            alert("Ingrese minimo " + min + " caracteres");
            return false;
        }
        return true;
    }
    Personas.isString = isString;
    function isNumber(num, min) {
        if (num < min || !num) {
            alert("Ingrese numeros mayores a " + min);
            return false;
        }
        return true;
    }
    Personas.isNumber = isNumber;
})(Personas || (Personas = {}));
