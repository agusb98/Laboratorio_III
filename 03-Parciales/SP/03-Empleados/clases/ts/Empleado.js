"use strict";
var Personas;
(function (Personas) {
    class Empleado extends Personas.Persona {
        constructor(legajo, nombre, apellido, edad, turno) {
            super(legajo, nombre, apellido, edad);
            this.turno = turno;
        }
        getTurno() {
            return this.turno;
        }
        setTurno(turno) {
            this.turno = turno;
        }
    }
    Personas.Empleado = Empleado;
})(Personas || (Personas = {}));
