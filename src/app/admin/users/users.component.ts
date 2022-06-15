import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { userModel } from './users.model';
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
  userModelObj = new userModel;
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
  onEdit(row : any) {
    console.log(row);
    this.userModelObj.id = row.id;
    this.signupForm.controls['nama'].setValue(row.nama);
    this.signupForm.controls['email'].setValue(row.email);
    this.signupForm.controls['nip'].setValue(row.nip);
    this.signupForm.controls['nohape'].setValue(row.nohape);
    this.signupForm.controls['rolesId'].setValue(row.rolesId);
    this.signupForm.controls['divisi'].setValue(row.divisi);
    this.signupForm.controls['password'].setValue(row.password);
  }
  updateUser() {
    this.userModelObj.nama = this.signupForm.value.nama;
    this.userModelObj.email = this.signupForm.value.email;
    this.userModelObj.nip = this.signupForm.value.nip;
    this.userModelObj.nohape = this.signupForm.value.nohape;
    this.userModelObj.rolesId = this.signupForm.value.rolesId;
    this.userModelObj.divisi = this.signupForm.value.divisi;
    this.userModelObj.password = this.signupForm.value.password;
    this.apiUsers.updateUser(this.userModelObj.id, this.userModelObj)
    .subscribe({
      next: (res) => {
        Swal.fire(
          'Berhasil!',
          'Data berhasil diedit!',
          'success'
        )
        this.signupForm.reset();
        this.getUser();
        this.router.navigate(['admin/users']);
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
        if (row.rolesId === 3) {
          Swal.fire(
            'Gagal!',
            'Anda tidak bisa menghapus!',
            'error')
        } else {
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
      }
    })
  }
}
