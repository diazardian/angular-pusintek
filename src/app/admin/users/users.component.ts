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

  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private apiUsers : UsersService, private router : Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      nama:['',Validators.required],
      email:['',Validators.required],
      nip:['',Validators.required],
      nohape:['',Validators.required],
      roles:[''],
      password:['',Validators.required],
    });
  }
  signUp(){
    if(this.signupForm.valid){
      this.apiUsers.postUser(this.signupForm.value)
      .subscribe({
        next:(res)=>{
          Swal.fire(
            'Berhasil!',
            'Data berhasil ditambahkan',
            'success'
          ) 
          this.signupForm.reset();
          this.router.navigate(['admin/users']);
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
