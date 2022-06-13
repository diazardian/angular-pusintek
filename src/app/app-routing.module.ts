import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', title:'Aplikasi Task List Pegawai', component: IndexComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', title:'Login', component: LoginComponent },
  { path: 'admin', title: 'Admin | Home',
    loadChildren: () => import("./admin/admin-routing.module").then(m => m.AdminRoutingModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
