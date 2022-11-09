import { Comentario } from './../../Dominio/Comentario';
import { PopupComponent } from './../popup/popup.component';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  constructor(public service: ServiceService, private router: Router) { }

  @Input()
  titulo!: string
  @Input()
  apodo!: string
  @Input()
  descripcion!: string

  tituloContenido!: string | undefined;


  ngOnInit(): void {
    const idContenido = this.idContenido()
    this.service.buscarTituloContPorId(idContenido).subscribe(res => {
      let titulo = res.at(0)?.titulo + " - " + res.at(0)?.tipo_contenido 
      this.tituloContenido = titulo
    })
    
  }

  irAContenidos() {
    this.router.navigateByUrl("/contenido")
  }

  comentar() {
    const idContenido = this.idContenido()
    const comentario = new Comentario(this.titulo, this.apodo, this.descripcion, idContenido)
    console.log(comentario)
    this.service.comentar(comentario).subscribe(res => {
      if (res[0] == 'todo ok'){
        this.confirmarEnvioDeComentario("Comentario enviado")
      } else {
        this.confirmarEnvioDeComentario("No se ha podido enviar el comentario")
      }
    })
  }

  idContenido() {
    return parseInt(this.router.url.split('comentario/')[1])
  }

  confirmarEnvioDeComentario(message:string) {
    PopupComponent.mostrarPopUp(message)
    timer(2500).subscribe(x => { 
      PopupComponent.ocultarPopUp()
      this.router.navigateByUrl("/contenido") })
  }
}
