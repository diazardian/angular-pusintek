import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user : any=[];
  constructor() { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (localStorage.getItem('user') !== null) {
      const res = localStorage.getItem('user');
      this.user = JSON.parse(res !== null ? res : '{}');
    }
  }

}
