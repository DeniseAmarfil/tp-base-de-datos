import { Contenido, MasComentados } from './../../Dominio/Contenido';
import { ServiceService } from './../service.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent {
  private subscription: Subscription = new Subscription();
  constructor(public service: ServiceService, private router: Router) { }

  contenidos!: Contenido[] | null
  canciones!: Contenido[]
  videos!: Contenido[]
  documentos!: Contenido[]
  seMuestranTodosLosContenidos = true
  masComentados: MasComentados[] = []

  ngOnInit(): void {
    this.musica()
  }


  musica() {
    this.subscription.add( this.service.getMusica().subscribe(res => {
        this.contenidos = res
      }))
    
  }

  video() {
    this.subscription.add(this.service.getVideos().subscribe(res => {
      this.contenidos = res
    }))
  }

  documento() {
    this.subscription.add(this.service.getDocumentos().subscribe(res => {
      this.contenidos = res
    }))
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
    this.subscription.add(this.service.getMasComentados().subscribe(res => {
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
    }))
    this.seMuestranTodosLosContenidos = false
  }
  esCorteControl(data:string){
    return data == "-"
  }
  irAComentar(id: number) {
    this.router.navigateByUrl("/comentario/" + id)
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
