"use strict";
var Vehiculos;
(function (Vehiculos) {
    class Vehiculo {
        constructor(id, marca, modelo, precio) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        getMarca() {
            return this.marca;
        }
        setMarca(marca) {
            this.marca = marca;
        }
        getModelo() {
            return this.modelo;
        }
        setModelo(modelo) {
            this.modelo = modelo;
        }
        getPrecio() {
            return this.precio;
        }
        setPrecio(precio) {
            this.precio = precio;
        }
        getId() {
            return this.id;
        }
        setId(id) {
            this.id = id;
        }
    }
    Vehiculos.Vehiculo = Vehiculo;
})(Vehiculos || (Vehiculos = {}));
