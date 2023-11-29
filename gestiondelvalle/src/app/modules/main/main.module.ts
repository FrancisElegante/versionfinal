import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MainComponent } from './pages/main/main.component';
import { ProductoseleccionadoComponent } from './pages/productoseleccionado/productoseleccionado.component';
import { MainRoutingModule } from './main-routing.module';
import { CarruselComponent } from './pages/carrusel/carrusel.component';



@NgModule({
  declarations: [
    CarritoComponent,
    MainComponent,
    ProductoseleccionadoComponent,
    CarruselComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  exports: [
    CarruselComponent
  ]
})
export class MainModule { }
