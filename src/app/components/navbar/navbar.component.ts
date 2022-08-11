import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  APIusers = "http://localhost:4201/users/";
  userWelcome = 'MusiForum';
  roleAdmin = undefined;
  loggedUserId = undefined;

  constructor(private authService: AuthService) {
    this.authService.authSubject.subscribe(val => {
      if (val !== null){
        this.userWelcome = `MusiForum  | Ciao, ${val?.user.firstname}`;
      } else {
        this.userWelcome = 'MusiForum'
      }
    })
   }

  ngOnInit(): void {
    this.jsonData();
  }

  logout() {
    this.authService.logout();
  }

  jsonData() {
    let jsonData = localStorage.getItem('authenticated');
    if (jsonData) {
      let user = JSON.parse(jsonData);
      this.loggedUserId = user.user.id;
      this.roleAdmin = user.user.role;
    }
  }
}
