import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer, UnaryFunction } from 'rxjs';
import { Comentario } from 'src/Dominio/Comentario';
import { PopupComponent } from '../popup/popup.component';
import { ServiceService } from '../service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contenido-comentarios',
  templateUrl: './contenido-comentarios.component.html',
  styleUrls: ['./contenido-comentarios.component.css']
})
export class ContenidoComentariosComponent implements OnInit {
    private subscription: Subscription = new Subscription();
    constructor(public service: ServiceService, private router: Router) { }
  
    tituloContenido!: string | undefined;
    comentarios!: Comentario[] | null
    cargando:boolean = true

    ngOnInit(): void {
      const idContenido = this.idContenido()
      this.subscription.add( this.service.buscarTituloContPorId(idContenido).subscribe(res => {
        let titulo = res.at(0)?.titulo + " - " + res.at(0)?.tipo_contenido 
        this.tituloContenido = titulo
      }))
      timer(500).subscribe( x =>
        this.subscription.add( this.service.buscarComentariosDeUnContenido(idContenido).subscribe(res =>{
          this.comentarios = res
          this.cargando=false
        }))
      )
      
    }
    
    borrarComentario(id_comentario:number){
      this.respuestaPopUpConfirmacion(id_comentario)
      
    }

    editarComentario(id_comentario:number){
      this.router.navigateByUrl("comentario/"+this.idContenido()+"/agregarComentario/"+id_comentario)
    }
    respuestaPopUp(message:string, successState:boolean) {
      PopupComponent.mostrarPopUp(message, successState)
      timer(4000).subscribe(x => { 
        PopupComponent.ocultarPopUp()
        this.ngOnInit()
        this.cargando = true
       })
    }
    respuestaPopUpConfirmacion(id_comentario:number) {
      PopupComponent.mostrarPopUpConfirmacion(id_comentario, this.idContenido())
      this.ngOnInit()
    }
    irAComentar() {
      this.router.navigateByUrl("comentario/"+this.idContenido()+"/agregarComentario")
    }
    volver(){
      this.router.navigateByUrl("contenido")
    }
    idContenido() {
      return parseInt(this.router.url.split('comentario/')[1])
    }
    noHayComentarios() {
      return this.comentarios?.length == 0
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
}

