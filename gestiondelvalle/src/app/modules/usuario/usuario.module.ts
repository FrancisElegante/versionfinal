import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/usuario/main.component';
import { ContrasenaComponent } from './pages/contrasena/contrasena.component';
import { DatosComponent } from './pages/datos/datos.component';
import { DireccionComponent } from './pages/direccion/direccion.component';



@NgModule({
  declarations: [
    MainComponent,
    ContrasenaComponent,
    DatosComponent,
    DireccionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainModule { }
