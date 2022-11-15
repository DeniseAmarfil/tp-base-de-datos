import { Component, Input } from '@angular/core'
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent{
  private subscription: Subscription = new Subscription();

  constructor(public service: ServiceService, public router: Router) { }
  PopupComponent = PopupComponent
  static visible: boolean = false
  static visibleConfirmacion: boolean = false
  static success: boolean = false
  static messageText: string | undefined;
  static idComentarioABorrar: number
  static idContenido :number

  static mostrarPopUp(message : string, successState : boolean) {
    this.visible = true
    this.messageText = message
    this.success = successState
  }
  static mostrarPopUpConfirmacion(id_comentario:number, idContenido : number) {
    this.visibleConfirmacion = true
    this.idComentarioABorrar = id_comentario
    this.idContenido = idContenido
  }

  static ocultarPopUp() {
    this.visible = false
    this.visibleConfirmacion = false
  }

  static esVisible() {
    return this.visible
  }
  static esVisibleConfirmacion() {
    return this.visibleConfirmacion
  }
  static esSuccess(){
    return this.success
  }

  aceptar(){
    this.subscription.add( this.service.borrarComentario(PopupComponent.idComentarioABorrar).subscribe(res =>{
      if (res.mensaje.includes('1451')){
        this.respuestaPopUp("No se puede eliminar ya que el comentario tiene réplicas.", false)
      } else if (res.mensaje.includes('comentario eliminado')){
        this.respuestaPopUp("Comentario eliminado.", true)
      } else {
        this.respuestaPopUp("Hubo un error al eliminar el comentario. Error: "+res.mensaje, false)
      }
    }))
  }
  respuestaPopUp(message:string, successState:boolean) {
    PopupComponent.ocultarPopUp()
    PopupComponent.mostrarPopUp(message, successState)
    timer(3000).subscribe(x => { 
      PopupComponent.ocultarPopUp()
      window.location.reload()
      this.router.navigateByUrl(this.router.url)
     })
  }
  cancelar(){
    PopupComponent.ocultarPopUp()
    this.router.navigateByUrl(this.router.url)
  }
}
