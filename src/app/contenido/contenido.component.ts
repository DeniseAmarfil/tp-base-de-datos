import { Contenido } from './../../Dominio/Contenido';
import { ServiceService } from './../service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent {
  constructor(public service: ServiceService, private router: Router) { }

  contenidos!: Contenido[]
  canciones!: Contenido[]
  videos!: Contenido[]
  documentos!: Contenido[]
  seMuestranTodosLosContenidos = true

  musica() {
    if(!this.canciones) {
      this.canciones = this.service.getMusica()
    }
    this.contenidos = this.canciones
  }

  video() {
    if(!this.videos) {
      this.videos = this.service.getVideos()
    }
    this.contenidos = this.videos
  }

  documento() {
    if(!this.documentos) {
      this.documentos = this.service.getDocumentos()
    }
    this.contenidos = this.documentos
  }

  // musicaMasComentada() {
  //   if(!this.canciones) {
  //     //this.canciones = this.service.getMusica()
  //   }
  //   this.contenidos = this.canciones
  // }

  // videosMasComentados() {
  //   if(!this.videos) {
  //     this.masComentadosVideos = this.service.getVideos()
  //   }
  //   this.contenidos = this.videos
  // }

  // documentosMasComentados() {
  //   if(!this.documentos) {
  //     //this.documentos = this.service.getDocumentos()
  //   }
  //   this.contenidos = this.documentos
  // }

  noHayContenido() {
    return this.contenidos.length == 0
  }

  mostrarTodos() {
    this.seMuestranTodosLosContenidos = true
  }

  mostrarMasComentados() {
    this.seMuestranTodosLosContenidos = false
  }

  irAComentar(id: number) {
    this.router.navigateByUrl("/comentario/" + id)
  }

}
