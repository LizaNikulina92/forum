import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';


@Component({
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage implements OnInit {

  APIusers = "http://localhost:4201/users/";
  allUsers: any[] = [];


  constructor() {
   }

  ngOnInit(): void {
    this.getUsersData();
  }

  getUsersData() {
    fetch(this.APIusers)
      .then((response) => response.json())
      .then(userArr => {
        this.allUsers = userArr;
        this.allUsers.forEach(user =>{
          if (user.role === 'admin'){
          } else if (user.role === 'user'){
          }
      })
    })

  }

  deleteUser(id: number) {
    fetch(this.APIusers + id, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(json => {
        this.getUsersData();
      });
  }

  changeRole(id: number) {
    if (this.allUsers[id-1].role == 'user') {
      this.roleAdmin(id)
    } else if (this.allUsers[id-1].role == 'admin') {
      this.roleUser(id)
    }

  }

  roleAdmin(id: number) {
    fetch(this.APIusers + id, {
      method: "PUT",
      body: JSON.stringify(
        {
          email: this.allUsers[id-1].email,
          password: "12345",
          username: this.allUsers[id-1].username,
          firstname: this.allUsers[id-1].firstname,
          lastname: this.allUsers[id-1].lastname,
          role: "admin",
        }),
        headers: new Headers({
          "Content-Type": "application/json"
        }),
    })
      .then(res => res.json())
      .then(json => {
        this.getUsersData();
      })
  }

  roleUser(id: number) {
    fetch(this.APIusers + id, {
      method: "PUT",
      body: JSON.stringify(
        {
          email: this.allUsers[id-1].email,
          password: '12345',
          username: this.allUsers[id-1].username,
          firstname: this.allUsers[id-1].firstname,
          lastname: this.allUsers[id-1].lastname,
          role: "user",
        }),
        headers: new Headers({
          "Content-Type": "application/json"
        }),
    })
      .then(res => res.json())
      .then(json => {
        this.getUsersData();
      })
  }


}
