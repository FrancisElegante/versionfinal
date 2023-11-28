import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=> import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'main',
    loadChildren:()=> import('./modules/main/main.module').then(m=>m.MainModule)
  },
  {
    path:'usuario',
    loadChildren:()=> import('./modules/usuario/usuario.module').then(m=>m.UsuarioModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
