"use strict";
var Personas;
(function (Personas) {
    let eSexo;
    (function (eSexo) {
        eSexo[eSexo["Masculino"] = 0] = "Masculino";
        eSexo[eSexo["Femenino"] = 1] = "Femenino";
    })(eSexo || (eSexo = {}));
    class Cliente extends Personas.Persona {
        constructor(id, nombre, apellido, edad, sexo) {
            super(id, nombre, apellido);
            this.sexo = sexo;
            this.edad = edad;
        }
        getSexo() {
            return this.sexo;
        }
        setSexo(sexo) {
            this.sexo = sexo;
        }
        getEdad() {
            return this.edad;
        }
        setEdad(edad) {
            this.edad = edad;
        }
    }
    Personas.Cliente = Cliente;
})(Personas || (Personas = {}));
