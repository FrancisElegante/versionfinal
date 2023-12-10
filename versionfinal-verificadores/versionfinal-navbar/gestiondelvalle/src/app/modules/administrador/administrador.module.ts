import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductosAddComponent } from './pages/productos/productos-add/productos-add.component';
import { ProductosEditComponent } from './pages/productos/productos-edit/productos-edit.component';
import { AdministradorRoutingModule } from './administrador-routing.module';
import { FormsModule,ReactiveFormsModule, FormGroup, Validators, FormBuilder } from "@angular/forms";


import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AdministradorComponent,
    ProductosComponent,
    ProductosAddComponent,
    ProductosEditComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessagesModule,
    ButtonModule,
    ToastModule,
    PasswordModule
  ],
  providers:[
    MessageService
  ]
})
export class AdministradorModule { }
