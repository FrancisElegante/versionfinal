import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { MainComponent } from './pages/main/main.component';
import { ProductoseleccionadoComponent } from './pages/productoseleccionado/productoseleccionado.component';
import { MainRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [
    CarritoComponent,
    MainComponent,
    ProductoseleccionadoComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
