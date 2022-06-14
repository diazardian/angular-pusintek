import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faDiceD6, faGaugeHigh, faListCheck, faPeopleLine, faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {

  showMenu = true;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  menu1 = faGaugeHigh;
  menu2 = faListCheck;
  menu3 = faDiceD6;
  menu4 = faPeopleLine;
  menu5 = faUser;
  admin = 'admin';

  user: any;
  constructor(private apiUser: MainService, private router: Router) { }
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (localStorage.getItem('user') !== null) {
      const res = localStorage.getItem('user');
      this.user = JSON.parse(res !== null ? res : '{}');
    } else {
      Swal.fire(
        'Gagal!',
        'Anda belum login!',
        'error'
      )
      this.router.navigate(['login']);
    }
  }
  deleteData() {
    Swal.fire({
      title: 'Apakah kamu yakin keluar?',
      text: "kamu tidak dapat membatalkannya!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Keluar!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Berhasil!',
          'Kamu berhasil keluar',
          'success'
        )
        this.router.navigate(['']);
        localStorage.removeItem('user');
      }
    })
  }
}
