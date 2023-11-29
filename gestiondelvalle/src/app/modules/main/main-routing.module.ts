import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ProductoseleccionadoComponent } from './pages/productoseleccionado/productoseleccionado.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
 
      {path: 'carrito', component: CarritoComponent},
      {path: '', component: MainComponent},
      {path: 'productoseleccionado/:id', component: ProductoseleccionadoComponent}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class MainRoutingModule { }
