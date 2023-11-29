import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContrasenaComponent } from './pages/contrasena/contrasena.component';
import { DatosComponent } from './pages/datos/datos.component';
import { DireccionComponent } from './pages/direccion/direccion.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';

import { FormsModule,ReactiveFormsModule, FormGroup, Validators, FormBuilder } from "@angular/forms";


@NgModule({
  declarations: [
    ContrasenaComponent,
    DatosComponent,
    DireccionComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    DatosComponent,
    DireccionComponent,
    UsuarioComponent,
    ContrasenaComponent
  ]
})
export class UsuarioModule { }
