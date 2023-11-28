import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MainComponent } from './pages/main/main.component';
import { ProductoseleccionadoComponent } from './pages/productoseleccionado/productoseleccionado.component';



@NgModule({
  declarations: [
    CarritoComponent,
    MainComponent,
    ProductoseleccionadoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
