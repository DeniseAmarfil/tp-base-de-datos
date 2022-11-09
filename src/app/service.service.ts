import { Comentario } from './../Dominio/Comentario';
import { Contenido, MasComentados } from './../Dominio/Contenido';
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

  comentar(comentario: Comentario) {
    return this.http.post<any>(this.API_URL + 'comentar', comentario );
  }

  buscarTituloContPorId(id: number) {
    return this.http.get<Contenido[]>(this.API_URL + 'contenido/'+id );
    //return 'stub titulo contenido'
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
    return this.http.get<MasComentados[]>(this.API_URL + 'mas_comentados');
  }
}
