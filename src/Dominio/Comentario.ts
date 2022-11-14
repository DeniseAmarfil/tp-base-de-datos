export class Comentario {
    constructor(
        public titulo: string = '',
        public apodoComentarista: string = 'Anonimo',
        public descripcion: string,
        public id_contenido: number,
    ) {}
    id_comentario!: number
}