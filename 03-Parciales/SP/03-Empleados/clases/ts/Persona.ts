namespace Personas {
    export class Persona {
        private legajo: number;
        private nombre: string;
        private apellido: string;
        private edad: number;

        constructor(legajo: number, nombre: string, apellido: string, edad: number) {
            this.legajo = legajo;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }

        public getNombre(): string {
            return this.nombre;
        }

        public setNombre(nombre: string): void {
            this.nombre = nombre;
        }

        public getApellido(): string {
            return this.apellido;
        }

        public setApellido(apellido: string): void {
            this.apellido = apellido;
        }

        public getEdad(): number {
            return this.edad;
        }

        public setEdad(edad: number): void {
            this.edad = edad;
        }

        public getLegajo(): number {
            return this.legajo;
        }

        public setLegajo(legajo: number): void {
            this.legajo = legajo;
        }
    }
}