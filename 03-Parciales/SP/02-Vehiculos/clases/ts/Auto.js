"use strict";
var Vehiculos;
(function (Vehiculos) {
    class Auto extends Vehiculos.Vehiculo {
        constructor(id, marca, modelo, precio, cantidadPuertas) {
            super(id, marca, modelo, precio);
            this.cantidadPuertas = cantidadPuertas;
        }
        getCantidadPuertas() {
            return this.cantidadPuertas;
        }
        setCantidadPuertas(cantidadPuertas) {
            this.cantidadPuertas = cantidadPuertas;
        }
    }
    Vehiculos.Auto = Auto;
})(Vehiculos || (Vehiculos = {}));
