import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoseleccionadoComponent } from './productoseleccionado.component';

describe('ProductoseleccionadoComponent', () => {
  let component: ProductoseleccionadoComponent;
  let fixture: ComponentFixture<ProductoseleccionadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoseleccionadoComponent]
    });
    fixture = TestBed.createComponent(ProductoseleccionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
