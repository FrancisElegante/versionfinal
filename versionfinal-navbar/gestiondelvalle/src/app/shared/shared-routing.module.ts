import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

import { FooterComponent } from './pages/footer/footer.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

const routes: Routes = [
  

      {path: 'footer', component: FooterComponent},
      {path: 'navbar', component: NavbarComponent}

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ]
})
export class SharedRoutingModule { }
