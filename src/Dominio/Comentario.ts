export class Comentario {
    constructor(
        public titulo: string = '',
        public apodoComentarista: string = 'Anonimo',
        public descripcion: string
    ) {}

    id!: number

}