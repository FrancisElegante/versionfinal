import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MainComponent } from './pages/main/main.component';
import { ProductoseleccionadoComponent } from './pages/productoseleccionado/productoseleccionado.component';
import { MainRoutingModule } from './main-routing.module';
import { CarruselComponent } from './pages/carrusel/carrusel.component';

import { FormsModule,ReactiveFormsModule, FormGroup, Validators, FormBuilder } from "@angular/forms";


@NgModule({
  declarations: [
    CarritoComponent,
    MainComponent,
    ProductoseleccionadoComponent,
    CarruselComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CarruselComponent,
    MainComponent,
    CarritoComponent,
    ProductoseleccionadoComponent
  ]
})
export class MainModule { }
