import { Comentario } from './Comentario';
export class Contenido {
    constructor(
        public titulo: string,
        public extension: string,
        public cantComentarios: number,
    ) {}
    fecPublicacion: Date = new Date()
    id!: number
    comentarios: Comentario[] = []

}
