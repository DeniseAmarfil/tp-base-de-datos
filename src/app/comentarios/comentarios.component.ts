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

  tituloContenido!: string;


  ngOnInit(): void {
    const idContenido = this.idContenido()
    this.tituloContenido = this.service.buscarTituloContPorId(idContenido)
  }

  irAContenidos() {
    this.router.navigateByUrl("/contenido")
  }

  comentar() {
    const idContenido = this.idContenido()
    const comentario = new Comentario(this.titulo, this.apodo, this.descripcion)
    this.service.comentar(idContenido, comentario)
    this.confirmarEnvioDeComentario() /// Pasar al service
  }

  idContenido() {
    return parseInt(this.router.url.split('comentario/')[1])
  }

  confirmarEnvioDeComentario() {
    PopupComponent.mostrarPopUp()
    timer(2500).subscribe(x => { 
      PopupComponent.ocultarPopUp()
      this.router.navigateByUrl("/contenido") })
  }
}
