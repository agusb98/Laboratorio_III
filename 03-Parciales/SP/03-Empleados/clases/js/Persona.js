var Personas;
(function (Personas) {
    var Persona = /** @class */ (function () {
        function Persona(legajo, nombre, apellido, edad) {
            this.legajo = legajo;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Persona.prototype.getNombre = function () {
            return this.nombre;
        };
        Persona.prototype.setNombre = function (nombre) {
            this.nombre = nombre;
        };
        Persona.prototype.getApellido = function () {
            return this.apellido;
        };
        Persona.prototype.setApellido = function (apellido) {
            this.apellido = apellido;
        };
        Persona.prototype.getEdad = function () {
            return this.edad;
        };
        Persona.prototype.setEdad = function (edad) {
            this.edad = edad;
        };
        Persona.prototype.getLegajo = function () {
            return this.legajo;
        };
        Persona.prototype.setLegajo = function (legajo) {
            this.legajo = legajo;
        };
        return Persona;
    }());
    Personas.Persona = Persona;
})(Personas || (Personas = {}));
