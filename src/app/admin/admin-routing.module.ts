import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DivisiComponent } from "./divisi/divisi.component";
import { HomeComponent } from "./home/home.component";
import { InputTaskComponent } from "./input-task/input-task.component";
import { MainComponent } from "./main/main.component";
import { RolesComponent } from "./roles/roles.component";
import { TodoComponent } from "./todo/todo.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
    {
        path: "", component: MainComponent, children: [
            {
                path: "",
                redirectTo: "admin/home",
                pathMatch: "full",
            },
            {
                path: 'admin/home', component: HomeComponent, title: 'Admin | Home'
            },
            {
                path: 'admin/task', component: TodoComponent, title: 'Admin | Task'
            },
            {
                path: 'admin/roles', component: RolesComponent, title: 'Admin | Role'
            },
            {
                path: 'admin/divisi', component: DivisiComponent, title: 'Admin | Divisi'
            },
            {
                path: 'admin/users', component: UsersComponent, title: 'Admin | User'
            },
            {
                path: 'admin/input_task', component: InputTaskComponent, title: 'Admin | Task'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }