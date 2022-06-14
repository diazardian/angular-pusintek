import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { divisiModel } from './divisi.model';
import { DivisiService } from './divisi.service';

@Component({
  selector: 'app-divisi',
  templateUrl: './divisi.component.html',
  styleUrls: ['./divisi.component.css']
})
export class DivisiComponent implements OnInit {

  divisiForm !: FormGroup;
  divisiEditForm !: FormGroup;
  divisiModelObj =  new divisiModel();
  divisiData !: any;
  constructor(private formBuilder : FormBuilder, private apiDivisi : DivisiService, private router : Router) { }

  ngOnInit(): void {
    this.divisiForm = this.formBuilder.group({
      divisi : ['',Validators.required]
    })
    this.divisiEditForm = this.formBuilder.group({
      editDivisi: ['', Validators.required]
    })
    this.getDivisi();
  }
  addDivisi() {
    if (this.divisiForm.valid) {
      this.apiDivisi.postDivisi(this.divisiForm.value)
        .subscribe({
          next: (res) => {
            Swal.fire(
              'Berhasil!',
              'Data berhasil ditambahkan',
              'success'
            )
            this.divisiForm.reset();
            this.getDivisi();
            this.router.navigate(['admin/divisi']);
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
  getDivisi() {
    this.apiDivisi.getDivisi()
      .subscribe({
        next: (res) => {
          console.log(res)
          this.divisiData = res;
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
        this.apiDivisi.deleteDivisi(row.id)
          .subscribe({
            next: (res) => {
              Swal.fire(
                'Berhasil!',
                'Data berhasil dihapus',
                'success'
              )
              this.divisiForm.reset();
              this.getDivisi();
              this.router.navigate(['admin/divisi']);
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
    this.divisiModelObj.id = row.id;
    this.divisiEditForm.controls['editDivisi'].setValue(row.divisi);
  }
  updateDivisi() {
    this.divisiModelObj.divisi = this.divisiEditForm.value.editDivisi;
    this.apiDivisi.updateDivisi(this.divisiModelObj.id, this.divisiModelObj)
    .subscribe({
      next: (res) => {
        Swal.fire(
          'Berhasil!',
          'Data berhasil diedit!',
          'success'
        )
        this.divisiEditForm.reset();
        this.getDivisi();
        this.router.navigate(['admin/divisi']);
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
