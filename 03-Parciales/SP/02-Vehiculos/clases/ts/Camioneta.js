"use strict";
var Vehiculos;
(function (Vehiculos) {
    class Camioneta extends Vehiculos.Vehiculo {
        constructor(id, marca, modelo, precio, cuatroXcuatro) {
            super(id, marca, modelo, precio);
            this.cuatroXcuatro = cuatroXcuatro;
        }
        getCuatroXcuatro() {
            return this.cuatroXcuatro;
        }
        setCuatroXcuatro(cuatroXcuatro) {
            this.cuatroXcuatro = cuatroXcuatro;
        }
    }
    Vehiculos.Camioneta = Camioneta;
})(Vehiculos || (Vehiculos = {}));
