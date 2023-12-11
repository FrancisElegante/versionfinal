import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ProductosAddComponent } from './pages/productos/productos-add/productos-add.component';
import { ProductosEditComponent } from './pages/productos/productos-edit/productos-edit.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { ChatComponent } from './pages/usuarios/chat/chat.component';
const routes: Routes = [


      {path: 'administrador', component: AdministradorComponent},
      {path: 'productos', component: ProductosComponent},
      {path: 'productos-add', component: ProductosAddComponent},
      {path: 'productos-edit', component: ProductosEditComponent},
      {path: 'usuarios', component: UsuariosComponent},
      {path: 'chat/:id', component: ChatComponent}



]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class AdministradorRoutingModule { }
