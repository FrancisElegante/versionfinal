import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosEditComponent } from './productos-edit.component';

describe('ProductosEditComponent', () => {
  let component: ProductosEditComponent;
  let fixture: ComponentFixture<ProductosEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosEditComponent]
    });
    fixture = TestBed.createComponent(ProductosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
