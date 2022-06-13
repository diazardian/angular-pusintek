import { Component, OnInit } from '@angular/core';
import { faDiceD6, faGaugeHigh, faListCheck, faPeopleLine, faUser } from '@fortawesome/free-solid-svg-icons';

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

constructor() { }
ngOnInit(): void {
}

}
