import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';

import { SharedRoutingModule } from './shared-routing.module';
import { UsuarioRoutingModule } from '../modules/usuario/usuario-routing.module';

import { UsuarioModule } from '../modules/usuario/usuario.module';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    UsuarioRoutingModule

  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
