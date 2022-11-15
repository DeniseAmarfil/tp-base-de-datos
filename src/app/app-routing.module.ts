import { ComentariosComponent } from './comentarios/comentarios.component'
import { ContenidoComponent } from './contenido/contenido.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ContenidoComentariosComponent } from './contenido-comentarios/contenido-comentarios.component'

const routes: Routes = [
  { path: 'contenido', component: ContenidoComponent, pathMatch: 'full' },
  { path: 'comentario/:id-contenido', component: ContenidoComentariosComponent, pathMatch: 'full' },
  { path: 'comentario/:id-contenido/agregarComentario', component: ComentariosComponent, pathMatch: 'full' },
  { path: 'comentario/:id-contenido/agregarComentario/:id_comentario', component: ComentariosComponent, pathMatch: 'full' },
  { path: '', redirectTo: 'contenido', pathMatch: 'full'},
  { path: '**', redirectTo: 'contenido', pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  ContenidoComponent, 
  ComentariosComponent
]
