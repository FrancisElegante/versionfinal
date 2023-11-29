import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductosAddComponent } from './pages/productos/productos-add/productos-add.component';
import { ProductosEditComponent } from './pages/productos/productos-edit/productos-edit.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { FormsModule,ReactiveFormsModule, FormGroup, Validators, FormBuilder } from "@angular/forms";



@NgModule({
  declarations: [
    AdministradorComponent,
    ProductosComponent,
    ProductosAddComponent,
    ProductosEditComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministradorModule { }
