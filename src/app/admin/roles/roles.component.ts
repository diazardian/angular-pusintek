import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  rolesForm !: FormGroup;
  rolesData !: any;
  constructor(private formBuilder: FormBuilder, private apiRoles: RolesService, private router: Router) { }

  ngOnInit(): void {
    this.rolesForm = this.formBuilder.group({
      roles: ['', Validators.required]
    })
    this.getRoles();
  }
  addRoles() {
    if (this.rolesForm.valid) {
      this.apiRoles.postRole(this.rolesForm.value)
        .subscribe({
          next: (res) => {
            Swal.fire(
              'Berhasil!',
              'Data berhasil ditambahkan',
              'success'
            )
            this.rolesForm.reset();
            this.getRoles();
            this.router.navigate(['admin/roles']);
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
  getRoles() {
    this.apiRoles.getRole()
      .subscribe({
        next: (res) => {
          this.rolesData = res;
        }
      })
  }
  deleteRole(row: any) {
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
        this.apiRoles.deleteRole(row.id)
          .subscribe({
            next: (res) => {
              Swal.fire(
                'Berhasil!',
                'Data berhasil dihapus',
                'success'
              )
              this.rolesForm.reset();
              this.getRoles();
              this.router.navigate(['admin/roles']);
            }
          })
      }
    })

  }
  editRole(row: any) {
    this.rolesForm.controls['roles'].setValue(row.roles);
  }

}
