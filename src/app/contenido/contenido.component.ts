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

  contenidos!: Contenido[] | null
  canciones!: Contenido[]
  videos!: Contenido[]
  documentos!: Contenido[]
  seMuestranTodosLosContenidos = true

  musica() {
      this.service.getMusica().subscribe(res => {
        this.canciones = res
      })
      this.contenidos = this.canciones
    
  }

  video() {
    this.service.getVideos().subscribe(res => {
      this.videos = res
    })
    this.contenidos = this.videos
  }

  documento() {
    this.service.getDocumentos().subscribe(res => {
      this.documentos = res
    })
    this.contenidos = this.documentos
  }

  noHayContenido() {
    return this.contenidos?.length == 0
  }

  mostrarTodos() {
    this.contenidos = null
    this.seMuestranTodosLosContenidos = true
  }

  mostrarMasComentados() {
    this.service.getMasComentados().subscribe(res => {
      this.contenidos = res

    })
    this.seMuestranTodosLosContenidos = false
  }

  irAComentar(id: number) {
    this.router.navigateByUrl("/comentario/" + id)
  }

}
