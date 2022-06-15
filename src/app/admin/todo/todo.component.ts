import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { taskModel } from '../input-task/input-task.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  dataTask !: any;
  dataUser !: any;
  user !: any;
  taskModelObj = new taskModel();
  constructor(private apiTodo: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    const data = localStorage.getItem('user');
    const user = JSON.parse(data !== null ? data : '{}');
    this.user = user;
    if (user.rolesId === 3) {
      this.apiTodo.getAllTask()
        .subscribe(res => {
          this.dataUser = res;
          console.log(this.dataUser);
        })
    } else {
      this.apiTodo.getTodos(user.id)
        .subscribe({
          next: (res) => {
            this.dataTask = res;
            console.log(this.dataTask);
            
          }
        })
    }
  }
  updateTodo(row : any) {
    console.log(row);
    this.taskModelObj.id = row.id;
    this.taskModelObj.task = row.task;
    this.taskModelObj.tanggal_mulai = row.tanggal_mulai;
    this.taskModelObj.tanggal_selesai = row.tanggal_selesai;
    this.taskModelObj.userId = row.userId;
    this.taskModelObj.status = 'selesai';
    this.apiTodo.editTodo(this.taskModelObj.id, this.taskModelObj)
    .subscribe({
      next: (res) => {
        Swal.fire(
          'Berhasil!',
          'Data berhasil diedit!',
          'success'
        )
        this.getTodos();
        this.router.navigate(['admin/task']);
      },
      error: () => {
        Swal.fire(
          'Gagal!',
          'Data gagal diupdate',
          'error'
        )
      }
    })
  }
  deleteTodo(row : any) {
    console.log(row.task);
    
    Swal.fire({
      title: 'Apakah kamu yakin?',
      text: "kamu tidak dapat membatalkannya!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiTodo.deleteTodo(row.id)
          .subscribe({
            next: (res) => {
              Swal.fire(
                'Berhasil!',
                'Data berhasil dihapus',
                'success'
              )
              this.getTodos();
              this.router.navigate(['admin/task']);
            },
            error: () => {
              Swal.fire(
                'Gagal!',
                'Data gagal dihapus',
                'error'
              )
            }
          })
          
      }
    })
  }
}
