namespace Personas
{
    enum eSexo{Masculino, Femenino}

    export class Cliente extends Persona
    {
        private sexo:eSexo;
        private edad:number;

        constructor(id:number, nombre: string, apellido: string, edad: number, sexo: eSexo) {
            super(id, nombre, apellido);
            this.sexo = sexo;
            this.edad = edad;
        }

        public getSexo():eSexo {
            return this.sexo;
        }

        public setSexo(sexo:eSexo): void {
            this.sexo = sexo;
        }

        public getEdad():number {
            return this.edad;
        }

        public setEdad(edad:number): void {
            this.edad = edad;
        }
    }
}