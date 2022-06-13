import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { RolesComponent } from './roles/roles.component';
import { DivisiComponent } from './divisi/divisi.component';
import { UsersComponent } from './users/users.component';
import { InputTaskComponent } from './input-task/input-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    TodoComponent,
    RolesComponent,
    DivisiComponent,
    UsersComponent,
    InputTaskComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AdminRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
