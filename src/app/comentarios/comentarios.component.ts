import { Comentario } from './../../Dominio/Comentario';
import { PopupComponent } from './../popup/popup.component';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  constructor(public service: ServiceService, private router: Router) { }

  @Input()
  titulo!: string
  @Input()
  apodo!: string
  @Input()
  descripcion!: string

  tituloContenido!: string | undefined;
  idComentario!: any;
  esEdicion!: boolean


  ngOnInit(): void {
    this.esEdicion = this.router.url.includes("agregarComentario/")
    if(this.esEdicion){
      this.idComentario = Number(this.router.url.split('agregarComentario/')[1])
      this.subscription.add( this.service.buscarComentario(this.idComentario).subscribe(res => {
        this.descripcion = res.at(0)!.descripcion
        this.apodo = res.at(0)!.apodoComentarista
        this.titulo = res.at(0)!.titulo
      }))
    }
    timer(100).subscribe( x => {
      const idContenido = this.idContenido()
      this.subscription.add( this.service.buscarTituloContPorId(idContenido).subscribe(res => {
      let titulo = res.at(0)?.titulo + " - " + res.at(0)?.tipo_contenido 
      this.tituloContenido = titulo
      }))
  })
  }

  irAContenidos() {
    this.router.navigateByUrl("comentario/"+this.idContenido())
  }

  comentar() {
    const idContenido = this.idContenido()
    const comentario = new Comentario(this.titulo, this.apodo, this.descripcion, idContenido)
    if(this.esEdicion){
      comentario.id_comentario = this.idComentario
      this.subscription.add( this.service.editarComentario(comentario).subscribe(res => {
        if (res.mensaje.includes("Comentario modificado")){
          this.confirmarEnvioDeComentario("Comentario modificado.", true)
        } else {
          this.confirmarEnvioDeComentario("No se ha podido modificar el comentario. Error: "+res.mensaje, false)
        }
      }))
    }else{
      this.subscription.add( this.service.comentar(comentario).subscribe(res => {
        if (res.mensaje.includes("Comentario agregado")){
          this.confirmarEnvioDeComentario("Comentario enviado", true)
        } else {
          this.confirmarEnvioDeComentario("No se ha podido enviar el comentario. Error: "+res.mensaje, false)
        }
      }))
    }
    
  }

  idContenido() {
    return parseInt(this.router.url.split('comentario/')[1])
  }

  confirmarEnvioDeComentario(message:string, success:boolean) {
    PopupComponent.mostrarPopUp(message, success)
    timer(2500).subscribe(x => { 
      PopupComponent.ocultarPopUp()
      this.router.navigateByUrl("comentario/"+this.idContenido()) })
    }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
