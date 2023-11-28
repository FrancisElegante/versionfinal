import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContrasenaComponent } from './pages/contrasena/contrasena.component';
import { DatosComponent } from './pages/datos/datos.component';
import { DireccionComponent } from './pages/direccion/direccion.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'contrasena', component: ContrasenaComponent},
      {path: 'datos', component: DatosComponent},
      {path: 'direccion', component: DireccionComponent},
      {path: 'usuario', component: UsuarioComponent},

    ]
  }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class UsuarioRoutingModule { }
