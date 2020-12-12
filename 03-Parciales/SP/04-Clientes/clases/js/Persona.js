"use strict";
var Personas;
(function (Personas) {
    class Persona {
        constructor(id, nombre, apellido) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
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
        getId() {
            return this.id;
        }
        setId(id) {
            this.id = id;
        }
    }
    Personas.Persona = Persona;
})(Personas || (Personas = {}));
