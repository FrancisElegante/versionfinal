import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToRegister = () => redirectUnauthorizedTo(['/auth/login']);


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/main' },
  {
    path:'auth',
    loadChildren:()=> import('./modules/auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:'main',
    loadChildren:()=> import('./modules/main/main.module').then(m=>m.MainModule), ...canActivate(redirectUnauthorizedToRegister) 
  },
  {
    path:'usuario',
    loadChildren:()=> import('./modules/usuario/usuario.module').then(m=>m.UsuarioModule), ...canActivate(redirectUnauthorizedToRegister) 
  },
  {
    path:'administrador',
    loadChildren:()=> import('./modules/administrador/administrador.module').then(m=>m.AdministradorModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
