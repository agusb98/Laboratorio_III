namespace Personas
{
    export class Empleado extends Persona
    {
        private turno:string;

        constructor(legajo:number, nombre:string, apellido : string, edad : number, turno: string) {
            super(legajo, nombre, apellido, edad);
            this.turno = turno;
        }

        public getTurno():string {
            return this.turno;
        }

        public setTurno(turno:string): void {
            this.turno = turno;
        }
    }
}