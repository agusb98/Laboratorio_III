"use strict";
var Personas;
(function (Personas) {
    class Persona {
        constructor(legajo, nombre, apellido, edad) {
            this.legajo = legajo;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        getNombre() {
            return this.nombre;
        }
        setNombre(nombre) {
            this.nombre = nombre;
        }
        getApellido() {
            return this.apellido;
        }
        setApellido(apellido) {
            this.apellido = apellido;
        }
        getEdad() {
            return this.edad;
        }
        setEdad(edad) {
            this.edad = edad;
        }
        getLegajo() {
            return this.legajo;
        }
        setLegajo(legajo) {
            this.legajo = legajo;
        }
    }
    Personas.Persona = Persona;
})(Personas || (Personas = {}));
