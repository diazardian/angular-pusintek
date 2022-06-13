import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DivisiService } from './divisi.service';

@Component({
  selector: 'app-divisi',
  templateUrl: './divisi.component.html',
  styleUrls: ['./divisi.component.css']
})
export class DivisiComponent implements OnInit {

  divisiForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private apiDivisi : DivisiService, private router : Router) { }

  ngOnInit(): void {
    this.divisiForm = this.formBuilder.group({
      divisi : ['',Validators.required]
    })
  }
  addDivisi(){
    if(this.divisiForm.valid){
      this.apiDivisi.postRole(this.divisiForm.value)
      .subscribe({
        next:(res)=>{
          Swal.fire(
            'Berhasil!',
            'Data berhasil ditambahkan',
            'success'
          )
          this.divisiForm.reset();
          this.router.navigate(['admin/divisi']);
        },
        error:()=>{
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
