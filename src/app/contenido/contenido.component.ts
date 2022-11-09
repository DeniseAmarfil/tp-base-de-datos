import { Contenido, MasComentados } from './../../Dominio/Contenido';
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
  masComentados: MasComentados[] = []

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
    let comentados : MasComentados[] = []
    this.service.getMasComentados().subscribe(res => {
      let tipoAnt = res[0].tipo_contenido
      let sumaComentarios = 0
      for (let i in res){
        if (res[i].tipo_contenido == tipoAnt){
          sumaComentarios += res[i].cantComentarios
          comentados.push(res[i])
        } else {
          comentados.push(new MasComentados(tipoAnt,"-", sumaComentarios))
          sumaComentarios = 0
          tipoAnt = res[i].tipo_contenido
          sumaComentarios += res[i].cantComentarios
          comentados.push(res[i])
        }
        if(Number(i) == (res.length -1)){
          comentados.push(new MasComentados(tipoAnt,"-", sumaComentarios))
        }
      }
      this.masComentados = comentados
    })
    this.seMuestranTodosLosContenidos = false
  }

  irAComentar(id: number) {
    this.router.navigateByUrl("/comentario/" + id)
  }

}
