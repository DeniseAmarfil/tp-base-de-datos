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

  static mostrarPopUp() {
      this.visible = true
  }

  static ocultarPopUp() {
    this.visible = false
  }

  static esVisible() {
    return this.visible
  }
}
