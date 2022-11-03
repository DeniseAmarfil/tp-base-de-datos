import { Comentario } from './../Dominio/Comentario';
import { Contenido } from './../Dominio/Contenido';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  // TO-DO - aca hay que cambiar la ruta dependiendo la que se use
  private API_URL = 'http://127.0.0.1:5000/';
  constructor(private http: HttpClient) { }

  // static contenido: Contenido

  comentar(idContenido: number, comentario: Comentario) {
    // realizar comentario
  }

  buscarTituloContPorId(id: number) {
    //Buscar contenido
    return 'stub titulo contenido'
  }

  getMusica() {
    return this.http.get<Contenido[]>(this.API_URL + 'contenidos_musica');
  }

  getVideos() {
    return this.http.get<Contenido[]>(this.API_URL + 'contenidos_video');
  }

  getDocumentos() {
    return this.http.get<Contenido[]>(this.API_URL + 'contenidos_documento');
  }

  getMasComentados() {
    return this.http.get<Contenido[]>(this.API_URL + 'mas_comentados');
  }
}
