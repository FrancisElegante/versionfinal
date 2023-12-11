import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContrasenaComponent } from './pages/contrasena/contrasena.component';
import { DatosComponent } from './pages/datos/datos.component';
import { DireccionComponent } from './pages/direccion/direccion.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';

import { FormsModule,ReactiveFormsModule, FormGroup, Validators, FormBuilder } from "@angular/forms";

import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { ChatadminComponent } from './pages/chatadmin/chatadmin.component';

@NgModule({
  declarations: [
    ContrasenaComponent,
    DatosComponent,
    DireccionComponent,
    UsuarioComponent,
    ChatadminComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MessagesModule,
    ButtonModule,
    ToastModule,
    PasswordModule
  ],
  exports:[
    DatosComponent,
    DireccionComponent,
    UsuarioComponent,
    ContrasenaComponent
  ],
  providers:[
    MessageService
  ]
})
export class UsuarioModule { }
