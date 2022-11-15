import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
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
      timer(1000).subscribe( x =>
        this.subscription.add( this.service.buscarComentariosDeUnContenido(idContenido).subscribe(res =>{
          this.comentarios = res
          this.cargando=false
        }))
      )
      
    }
    
    borrarComentario(id:number){
      console.log(id)
      this.subscription.add( this.service.borrarComentario(id).subscribe(res =>{
        if (res.mensaje.includes('1451')){
          this.respuestaPopUp("No se pudo eliminar ya que el comentario tiene réplicas")
        } else if (res.mensaje.includes('comentario eliminado')){
          this.respuestaPopUp("Comentario eliminado")
        }
      }))
    }
    respuestaPopUp(message:string) {
      PopupComponent.mostrarPopUp(message)
      timer(4000).subscribe(x => { 
        PopupComponent.ocultarPopUp()
        this.ngOnInit()
       })
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

