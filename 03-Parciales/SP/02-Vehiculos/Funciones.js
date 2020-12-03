var Vehiculos;
(function (Vehiculos) {
    var arrayList = new Array();
    window.onload = function () {
        var _a, _b, _c, _d, _e, _f;
        //CONTENEDOR
        (_a = document.getElementById("btnAdd")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", confirmAdd);
        (_b = document.getElementById("btnOpen")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", openContainer);
        (_c = document.getElementById("btnClose")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", closeContainer);
        (_d = document.getElementById("btnCancel")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", closeContainer);
        (_e = document.getElementById("btnClear")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", clearContainer);
        (_f = document.getElementById("tipo")) === null || _f === void 0 ? void 0 : _f.addEventListener("change", tiposExistentes);
        //OCULTA CAMPOS
        document.getElementById("idCheck").addEventListener("change", hideFields);
        document.getElementById("marcaCheck").addEventListener("change", hideFields);
        document.getElementById("modeloCheck").addEventListener("change", hideFields);
        document.getElementById("precioCheck").addEventListener("change", hideFields);
        //FILTRAR
        document.getElementById("filter").addEventListener("change", Filter);
        //PROMEDIO
        document.getElementById("btnProm").addEventListener("click", getProm);
    };
    function openContainer() {
        clearContainer();
        document.getElementById("container").hidden = false;
    }
    Vehiculos.openContainer = openContainer;
    function clearContainer() {
        document.getElementById("marcaText").value = "";
        document.getElementById("modeloText").value = "";
        document.getElementById("precioText").value = "";
        document.getElementById("cantPuertasText").value = "";
        document.getElementById("tipo").value = "Auto";
        document.getElementById("Auto").hidden = false;
        document.getElementById("Camioneta").hidden = true;
    }
    Vehiculos.clearContainer = clearContainer;
    function closeContainer() {
        document.getElementById("container").hidden = true;
    }
    Vehiculos.closeContainer = closeContainer;
    function getNewId() {
        var id = 1;
        if (arrayList.length != 0) {
            id = arrayList.reduce(function (a, b) { return a > b ? b = a : b; }).getId() + 1;
        }
        return id;
    }
    Vehiculos.getNewId = getNewId;
    function getValuesOfElements() {
        var array = new Array();
        array[0] = (document.getElementById("marcaText").value).toString();
        array[1] = (document.getElementById("modeloText").value).toString();
        array[2] = (document.getElementById("precioText").value).toString();
        array[3] = (document.getElementById("tipo").value).toString();
        array[4] = (document.getElementById("cantPuertasText").value).toString();
        return array;
    }
    Vehiculos.getValuesOfElements = getValuesOfElements;
    function confirmAdd() {
        if (confirm("Confirm?")) {
            Add();
        }
    }
    Vehiculos.confirmAdd = confirmAdd;
    function Add() {
        var data = getValuesOfElements();
        var esCuatroXcuatro = document.getElementById("4x4Check").checked;
        if (checkValues(data[0], data[1], parseInt(data[2]), parseInt(data[4]))) {
            if (data[3] == "Auto") {
                var obj = new Vehiculos.Auto(getNewId(), data[0], data[1], parseInt(data[2]), parseInt(data[4]));
                arrayList.push(obj);
                var table = document.getElementById("table");
                createRow(table, obj);
            }
            else if (data[3] == "Camioneta") {
                var obj = new Vehiculos.Camioneta(getNewId(), data[0], data[1], parseInt(data[2]), esCuatroXcuatro);
                arrayList.push(obj);
                var table = document.getElementById("table");
                createRow(table, obj);
            }
            closeContainer();
        }
    }
    Vehiculos.Add = Add;
    function createRow(table, obj) {
        var tbody = table;
        var tr = document.createElement("tr");
        var td0 = document.createElement("td");
        td0.setAttribute("name", "idTh");
        var nodotext0 = document.createTextNode(obj.getId().toString());
        td0.appendChild(nodotext0);
        tr.appendChild(td0);
        var td1 = document.createElement("td");
        td1.setAttribute("name", "marcaTh");
        var nodotext1 = document.createTextNode(obj.getMarca());
        td1.appendChild(nodotext1);
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.setAttribute("name", "modeloTh");
        var nodotext2 = document.createTextNode(obj.getModelo());
        td2.appendChild(nodotext2);
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        td3.setAttribute("name", "precioTh");
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
    Vehiculos.createRow = createRow;
    function confirmDelete(tr) {
        if (confirm("Confirm?")) {
            Delete(tr);
        }
    }
    Vehiculos.confirmDelete = confirmDelete;
    function Delete(tr) {
        var trToDelete = tr.target.parentNode.parentNode;
        var idToDelete = trToDelete.childNodes[0].innerHTML;
        var table = document.getElementById("table");
        var list = arrayList.filter(function (obj) { return obj.getId() == idToDelete; });
        if (list.length > 0) {
            arrayList.splice(idToDelete, 1);
            removeChildNode(table, trToDelete, idToDelete);
        }
    }
    Vehiculos.Delete = Delete;
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
    Vehiculos.removeChildNode = removeChildNode;
    function hideFields() {
        var id = document.getElementById("idCheck");
        var marca = document.getElementById("marcaCheck");
        var modelo = document.getElementById("modeloCheck");
        var precio = document.getElementById("precioCheck");
        if (id.checked) {
            var var0 = document.getElementsByName("idTh");
            var0.forEach(function (x) { x.hidden = false; });
        }
        else {
            var var0 = document.getElementsByName("idTh");
            var0.forEach(function (x) { x.hidden = true; });
        }
        if (marca.checked) {
            var var1 = document.getElementsByName("marcaTh");
            var1.forEach(function (x) { x.hidden = false; });
        }
        else {
            var var1 = document.getElementsByName("marcaTh");
            var1.forEach(function (x) { x.hidden = true; });
        }
        if (modelo.checked) {
            var var2 = document.getElementsByName("modeloTh");
            var2.forEach(function (x) { x.hidden = false; });
        }
        else {
            var var2 = document.getElementsByName("modeloTh");
            var2.forEach(function (x) { x.hidden = true; });
        }
        if (precio.checked) {
            var var3 = document.getElementsByName("precioTh");
            var3.forEach(function (x) { x.hidden = false; });
        }
        else {
            var var3 = document.getElementsByName("precioTh");
            var3.forEach(function (x) { x.hidden = true; });
        }
    }
    Vehiculos.hideFields = hideFields;
    function tiposExistentes() {
        var tipo = document.getElementById("tipo").value;
        if (tipo == "Auto") {
            document.getElementById("Auto").hidden = false;
            document.getElementById("Camioneta").hidden = true;
        }
        else if (tipo == "Camioneta") {
            document.getElementById("Camioneta").hidden = false;
            document.getElementById("Auto").hidden = true;
        }
    }
    Vehiculos.tiposExistentes = tiposExistentes;
    function promPromesa() {
        return new Promise(function (resolve, reject) {
            var sum = arrayList.reduce(function (a, b) {
                return a += b.getPrecio();
            }, 0);
            resolve(sum);
        });
    }
    Vehiculos.promPromesa = promPromesa;
    function getProm() {
        promPromesa().then(function (response) {
            document.getElementById("promText").value
                = (response / arrayList.length).toString();
        });
    }
    Vehiculos.getProm = getProm;
    function filterPromise() {
        var filter = document.getElementById("filter").value;
        return new Promise(function (resolve, reject) {
            if (filter == "Todos") {
                reject(arrayList);
            }
            else if (filter == "Auto") {
                var listaFiltrada = arrayList.filter(function (obj) { return obj.constructor.name == filter; });
                resolve(listaFiltrada);
            }
            else if (filter == "Camioneta") {
                var listaFiltrada = arrayList.filter(function (obj) { return obj.constructor.name == filter; });
                resolve(listaFiltrada);
            }
        });
    }
    Vehiculos.filterPromise = filterPromise;
    function Filter() {
        var cabeceras = ["Id", "Marca", "Modelo", "Precio", "Accion"];
        document.getElementById("table").hidden = true;
        var filterTable = document.getElementById("filterTable");
        filterTable.hidden = false;
        filterPromise().then(function (response) {
            filterTable.innerHTML = "";
            var thead = document.createElement("thead");
            filterTable.appendChild(thead);
            for (var i = 0; i < cabeceras.length; i++) {
                thead.appendChild(document.createElement("th")).
                    appendChild(document.createTextNode(cabeceras[i]));
            }
            var arrayList = response;
            for (var i = 0; i < arrayList.length; i++) {
                createRow(filterTable, arrayList[i]);
            }
            filterTable.hidden = false;
        })["catch"](function (reject) {
            filterTable.hidden = true;
            document.getElementById("table").hidden = false;
        });
    }
    Vehiculos.Filter = Filter;
    /*/////////////////////////////////////////////////////////////////////////////
                                    VALIDACIONES
    /////////////////////////////////////////////////////////////////////////////*/
    function checkValues(var1, var2, var3, var4) {
        if (!isString(var1, 3)) {
            document.getElementById("marcaText").className = "classError";
            return false;
        }
        else if (!isString(var2, 3)) {
            document.getElementById("modeloText").className = "classError";
            return false;
        }
        else if (!isNumber(var3, 0)) {
            document.getElementById("precioText").className = "classError";
            return false;
        }
        else if (!isNumber(var4, 0)) {
            document.getElementById("cantPuertasText").className = "classError";
            return false;
        }
        else {
            document.getElementById("marcaText").className = "classOk";
            document.getElementById("modeloText").className = "classOk";
            document.getElementById("precioText").className = "classOk";
            document.getElementById("cantPuertasText").className = "classOk";
            return true;
        }
    }
    Vehiculos.checkValues = checkValues;
    function isString(str, min) {
        if (str == "" || str.length < min) {
            alert("Ingrese minimo " + min + " caracteres");
            return false;
        }
        return true;
    }
    Vehiculos.isString = isString;
    function isNumber(num, min) {
        if (document.getElementById("tipo").value == "Camioneta") {
            return true;
        }
        if (num < min || !num) {
            alert("Ingrese numeros mayores a " + min);
            return false;
        }
        return true;
    }
    Vehiculos.isNumber = isNumber;
})(Vehiculos || (Vehiculos = {}));
