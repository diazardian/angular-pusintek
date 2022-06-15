import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from '../users/users.service';
import { InputTaskService } from './input-task.service';

@Component({
  selector: 'app-input-task',
  templateUrl: './input-task.component.html',
  styleUrls: ['./input-task.component.css']
})
export class InputTaskComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private apiUsers: UsersService,private apiTask: InputTaskService, private router: Router) { }

  pegawaiData !: any;
  taskForm !: any;
  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      task : ['', Validators.required],
      tanggal_mulai : ['', Validators.required],
      tanggal_selesai : ['', Validators.required],
      userId : ['', Validators.required],
      status : ['onprogress', Validators.required]
    })
    this.getUser();
  }
  getUser() {
    this.apiUsers.getUser()
      .subscribe({
        next: (res) => {
          console.log(res)
          this.pegawaiData = res;
        }
      })
  }
  postTask() {
    if (this.taskForm.valid) {
      this.apiTask.postTask(this.taskForm.value)
      .subscribe({
        next: (res) => {
          Swal.fire(
            'Berhasil!',
            'Data berhasil ditambahkan',
            'success'
          )
          this.taskForm.reset();
          // this.getUser();
          this.router.navigate(['admin/input-task']);
        },
        error: () => {
          Swal.fire(
            'Gagal!',
            'Data gagal ditambahkan',
            'error'
          )
        }
      })
    }
  }

}
