import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoComentariosComponent } from './contenido-comentarios.component';

describe('ContenidoComentariosComponent', () => {
  let component: ContenidoComentariosComponent;
  let fixture: ComponentFixture<ContenidoComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoComentariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
