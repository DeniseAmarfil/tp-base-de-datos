import { Component, Input } from '@angular/core'
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent{
  constructor(public service: ServiceService, private router: Router) { }
  PopupComponent = PopupComponent
  static visible: boolean = false
  static success: boolean = false
  static messageText: string | undefined;

  static mostrarPopUp(message : string, successState : boolean) {
    this.visible = true
    this.messageText = message
    this.success = successState
  }

  static ocultarPopUp() {
    this.visible = false
  }

  static esVisible() {
    return this.visible
  }
  static esSuccess(){
    return this.success
  }
}
