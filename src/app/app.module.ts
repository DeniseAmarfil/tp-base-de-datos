import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { routingComponents, AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ComentariosComponent } from './comentarios/comentarios.component'
import { ContenidoComponent } from './contenido/contenido.component'
import { PopupComponent } from './popup/popup.component'
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    ContenidoComponent,
    ComentariosComponent,
    routingComponents,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
