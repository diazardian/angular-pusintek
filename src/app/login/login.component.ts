import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin !: FormGroup;
  constructor(private formBuilder : FormBuilder, private apiLogin : LoginService, private router : Router) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      nip : ['',Validators.required],
      password : ['',Validators.required]
    });
  }

  login(){
    this.apiLogin.getUser()
    .subscribe({
      next: (res) => {
        const user = res.find((a:any)=>{
          return a.nip === this.formLogin.value.nip && a.password === this.formLogin.value.password
        });
        console.log(user)
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Kamu berhasil masuk!',
            showConfirmButton: false,
            timer: 1500
          });
          this.formLogin.reset();
          this.router.navigate(['admin/home']);
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Kamu gagal masuk!',
            showConfirmButton: false,
            timer: 1500
          });
        }
      },error: (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ada yang salah saat anda masuk',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

}
