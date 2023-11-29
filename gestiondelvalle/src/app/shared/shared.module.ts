import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';

import { SharedRoutingModule } from './shared-routing.module';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule

  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }
