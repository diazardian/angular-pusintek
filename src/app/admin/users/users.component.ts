import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  signupForm !: FormGroup;
  divisiData !: any;
  rolesData !: any;
  userData !: any;
  constructor(private formBuilder: FormBuilder, private apiUsers: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nama: ['', Validators.required],
      email: ['', Validators.required],
      nip: ['', Validators.required],
      nohape: ['', Validators.required],
      rolesId: [''],
      divisi: [''],
      password: ['', Validators.required],
    })
    this.getDivisi();
    this.getRoles();
    this.getUser();
  }
  getDivisi() {
    this.apiUsers.getDivisi()
      .subscribe({
        next: (res) => {
          console.log(res)
          this.divisiData = res;
        }
      })
  }
  getRoles() {
    this.apiUsers.getRoles()
      .subscribe({
        next: (res) => {
          console.log(res)
          this.rolesData = res;
        }
      })
  }
  signUp() {
    if (this.signupForm.valid) {
      this.apiUsers.postUser(this.signupForm.value)
        .subscribe({
          next: (res) => {
            Swal.fire(
              'Berhasil!',
              'Data berhasil ditambahkan',
              'success'
            )
            this.signupForm.reset();
            this.getUser();
            this.router.navigate(['admin/users']);
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
  getUser() {
    this.apiUsers.getUser()
      .subscribe({
        next: (res) => {
          console.log(res)
          this.userData = res;
        }
      })
  }
  deleteDivisi(row: any) {
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
        this.apiUsers.deleteUser(row.id)
          .subscribe({
            next: (res) => {
              Swal.fire(
                'Berhasil!',
                'Data berhasil dihapus',
                'success'
              )
              this.signupForm.reset();
              this.getUser();
              this.router.navigate(['admin/users']);
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
