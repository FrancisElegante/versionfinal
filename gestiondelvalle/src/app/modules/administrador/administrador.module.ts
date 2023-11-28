import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductosAddComponent } from './pages/productos/productos-add/productos-add.component';
import { ProductosEditComponent } from './pages/productos/productos-edit/productos-edit.component';



@NgModule({
  declarations: [
    AdministradorComponent,
    ProductosComponent,
    ProductosAddComponent,
    ProductosEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdministradorModule { }
