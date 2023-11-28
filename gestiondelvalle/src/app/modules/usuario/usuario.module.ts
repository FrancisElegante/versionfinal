import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContrasenaComponent } from './pages/contrasena/contrasena.component';
import { DatosComponent } from './pages/datos/datos.component';
import { DireccionComponent } from './pages/direccion/direccion.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'contrasena', component: ContrasenaComponent},
      {path: 'datos', component: DatosComponent},
      {path: 'direccion', component: DireccionComponent},

    ]
  }

]

@NgModule({
  declarations: [
    ContrasenaComponent,
    DatosComponent,
    DireccionComponent
  ],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class MainModule { }
