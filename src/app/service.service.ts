import { Comentario } from './../Dominio/Comentario';
import { Contenido, MasComentados } from './../Dominio/Contenido';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private API_URL = 'http://127.0.0.1:5000/';
  constructor(private http: HttpClient) { }

  comentar(comentario: Comentario) {
    return this.http.post<any>(this.API_URL + 'comentar', comentario );
  }

  buscarTituloContPorId(id: number) {
    return this.http.get<Contenido[]>(this.API_URL + 'contenido/'+id );
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

  buscarComentariosDeUnContenido(id: number) {
    return this.http.get<Comentario[]>(this.API_URL + 'comentarios/'+id );
  }
  buscarComentario(id: number) {
    return this.http.get<Comentario[]>(this.API_URL + 'comentario/'+id );
  }

  borrarComentario(id: number) {
    return this.http.delete<any>(this.API_URL + 'eliminarComentario/'+id );
  }
  editarComentario(comentarioEditado : Comentario) {
    return this.http.put<any>(this.API_URL + 'editarComentario', comentarioEditado);
  }
}
