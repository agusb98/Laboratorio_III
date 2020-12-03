var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Personas;
(function (Personas) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(legajo, nombre, apellido, edad, turno) {
            var _this = _super.call(this, legajo, nombre, apellido, edad) || this;
            _this.turno = turno;
            return _this;
        }
        Empleado.prototype.getTurno = function () {
            return this.turno;
        };
        Empleado.prototype.setTurno = function (turno) {
            this.turno = turno;
        };
        return Empleado;
    }(Personas.Persona));
    Personas.Empleado = Empleado;
})(Personas || (Personas = {}));
