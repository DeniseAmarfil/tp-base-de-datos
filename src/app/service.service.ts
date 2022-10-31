import { Comentario } from './../Dominio/Comentario';
import { Contenido } from './../Dominio/Contenido';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor() { }

  // static contenido: Contenido

  comentar(idContenido: number, comentario: Comentario) {
    // realizar comentario
  }

  buscarTituloContPorId(id: number) {
    //Buscar contenido
    return 'stub titulo contenido'
  }

  getMusica() {
    const stubCont = [new Contenido('aaaa', 'mp3',1), new Contenido('bbbbb', 'mp3',12), new Contenido('aaaa', 'mp3',13)]
    stubCont[0].id = 1
    stubCont[1].id = 2
    stubCont[2].id = 3
    return stubCont
  }

  getVideos() {
    const stubCont = [new Contenido('aaaa', 'mp4',343), new Contenido('bbbbb', 'mp4',43), new Contenido('aaaa', 'mp4',31243)]
    stubCont[0].id = 11
    stubCont[1].id = 12
    stubCont[2].id = 13
    
    return stubCont
  }

  getDocumentos() {
    const stubCont = [new Contenido('aaaa', 'txt',1), new Contenido('bbbbb', 'pdf',0), new Contenido('aaaa', 'xml',15)]
    stubCont[0].id = 21
    stubCont[1].id = 22
    stubCont[2].id = 23
    return stubCont
  }

  getMasComentados() {
    return [new Contenido('mas comentados', 'txt',1), new Contenido('mas comentados', 'pdf',0), new Contenido('mas comentados', 'xml',15)]
  }
}
