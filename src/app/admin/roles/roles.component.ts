import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { rolesModel } from './roles.model';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  rolesForm !: FormGroup;
  rolesEditForm !: FormGroup;
  rolesModelObj =  new rolesModel();
  rolesData !: any;
  constructor(private formBuilder: FormBuilder, private apiRoles: RolesService, private router: Router) { }

  ngOnInit(): void {
    this.rolesForm = this.formBuilder.group({
      roles: ['', Validators.required]
    })
    this.rolesEditForm = this.formBuilder.group({
      editRoles: ['', Validators.required]
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
  onEdit(row: any) {
    console.log(row);
    this.rolesModelObj.id = row.id;
    this.rolesEditForm.controls['editRoles'].setValue(row.roles);
  }
  updateRoles() {
    this.rolesModelObj.roles = this.rolesEditForm.value.editRoles;
    this.apiRoles.updateRole(this.rolesModelObj.id, this.rolesModelObj)
    .subscribe({
      next: (res) => {
        Swal.fire(
          'Berhasil!',
          'Data berhasil diedit!',
          'success'
        )
        this.rolesEditForm.reset();
        this.getRoles();
        this.router.navigate(['admin/roles']);
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

}
